// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract SupplyChain {
    enum UserTypes {
        MANUFACTURER,
        SUPPLIER
    }

    enum TransitTypes {
        ARRIVAL,
        DEPARTURE
    }

    struct User {
        string name;
        UserTypes uType;
    }

    struct Product {
        string name;
        string pType;
        address manufacturer;
        address[] holders;
        uint manTime;
        uint32 quantity;
        uint32 price;
        string currency;
    }

    struct Transit {
        address holder;
        TransitTypes transitType;
        uint time;
    }

    struct ViewRecentTransit {
        uint uId;
        Product product;
        Transit transit;
    }

    struct ViewProduct {
        uint uId;
        Product product;
        Transit[] allTransits;
    }

    mapping(address => User) public users;
    mapping(uint => Product) public products;
    mapping(uint => Transit[]) public transits;
    uint[] public productUIds;
    uint[] private recentTransits;

    using Counters for Counters.Counter;
    Counters.Counter private productCount;

    function random(uint time, string calldata name)
        private
        view
        returns (uint)
    {
        return
            uint(keccak256(abi.encodePacked(block.difficulty, time, name))) %
            1000000000000000;
    }

    function addUser(string calldata name, string calldata uType) public {
        require(
            keccak256(bytes(users[msg.sender].name)) == keccak256(bytes("")),
            "User already exists"
        );

        User memory _newUser;
        _newUser.name = name;

        if (keccak256(bytes(uType)) == keccak256(bytes("manufacturer")))
            _newUser.uType = UserTypes.MANUFACTURER;
        else if (keccak256(bytes(uType)) == keccak256(bytes("supplier")))
            _newUser.uType = UserTypes.SUPPLIER;
        else revert("Invalid user type");

        users[msg.sender] = _newUser;
    }

    function addProduct(
        string calldata name,
        string calldata pType,
        uint manTime,
        uint32 quantity,
        uint32 price,
        string calldata currency
    ) public {
        require(price != 0 && quantity != 0, "Invalid inputs");
        require(
            users[msg.sender].uType == UserTypes.MANUFACTURER,
            "Only manufacturer can add products"
        );

        Product memory _newProduct;
        _newProduct.name = name;
        _newProduct.pType = pType;
        _newProduct.manufacturer = msg.sender;
        _newProduct.manTime = manTime;
        _newProduct.quantity = quantity;
        _newProduct.price = price;
        _newProduct.currency = currency;

        uint _uid = random(manTime, name);
        require(
            products[_uid].manufacturer == address(0),
            "Duplicate product id, try again"
        );
        products[_uid] = _newProduct;
        productUIds.push(_uid);
        productCount.increment();

        // Adding a default transit
        Transit memory _newTransit;
        _newTransit.holder = msg.sender;
        _newTransit.transitType = TransitTypes.ARRIVAL;
        _newTransit.time = manTime;
        transits[_uid].push(_newTransit);

        // Adding it to recent transits
        recentTransits.push(_uid);
    }

    function getAllProducts() public view returns (Product[] memory) {
        console.log("Getting all products from contract");
        Product[] memory _allProducts = new Product[](productCount.current());
        for (uint i = 0; i < productCount.current(); i++) {
            _allProducts[i] = products[productUIds[i]];
            console.log("Product %d is %s", i, _allProducts[i].name);
        }

        return _allProducts;
    }

    function addArrival(uint productUId, uint time) public {
        console.log("Adding new arrival");

        // geting last transit
        Transit memory _prevTransit;
        _prevTransit = transits[productUId][transits[productUId].length - 1];
        require(
            _prevTransit.transitType == TransitTypes.DEPARTURE,
            "The product must depart from the current holder"
        );
        require(
            _prevTransit.holder == msg.sender,
            "The product should arrive from the same previous holder"
        );

        Transit memory _newTransit;
        _newTransit.holder = msg.sender;
        _newTransit.time = time;
        _newTransit.transitType = TransitTypes.ARRIVAL;

        transits[productUId].push(_newTransit);
        recentTransits.push(productUId);
    }

    function addDeparture(
        uint productUId,
        uint time,
        address nextHolder
    ) public {
        console.log("Adding new departure");

        // geting last transit
        Transit memory _prevTransit;
        _prevTransit = transits[productUId][transits[productUId].length - 1];
        require(
            _prevTransit.transitType == TransitTypes.ARRIVAL,
            "The product must arrive from the previous holder"
        );
        require(
            _prevTransit.holder != nextHolder,
            "The product cannot depart to the same previous holder"
        );

        Transit memory _newTransit;
        _newTransit.holder = nextHolder;
        _newTransit.time = time;
        _newTransit.transitType = TransitTypes.DEPARTURE;

        transits[productUId].push(_newTransit);
        recentTransits.push(productUId);

        // adding holder details to product
        products[productUId].holders.push(nextHolder);
    }

    function getAllTransits(uint count)
        public
        view
        returns (ViewRecentTransit[] memory)
    {
        console.log("Viewing last transits");

        // resetting count to available size
        if (count > recentTransits.length) count = recentTransits.length;

        console.log("count %d", count);

        ViewRecentTransit[] memory _lastTransits = new ViewRecentTransit[](
            count
        );
        uint[] memory _tempRecentTransits = new uint[](count);
        uint _length;

        for (
            int i = int(recentTransits.length - 1);
            i >= int(recentTransits.length - count);
            i--
        ) {
            uint _uId = recentTransits[uint(i)];
            console.log(_uId);
            uint _tempCount = 0;

            // find count of the same uid
            for (uint j = 0; j < _length; j++) {
                if (_tempRecentTransits[j] == _uId) _tempCount++;
            }

            _lastTransits[_length].uId = _uId;
            _lastTransits[_length].product = products[_uId];
            _lastTransits[_length].transit = transits[_uId][
                transits[_uId].length - 1 - _tempCount
            ];

            _tempRecentTransits[_length] = _uId;
            _length++;
        }

        return _lastTransits;
    }

    function getProduct(uint productUId)
        public
        view
        returns (ViewProduct memory)
    {
        require(
            products[productUId].manufacturer != address(0),
            "No such product"
        );

        Product memory _tempProduct = products[productUId];
        Transit[] memory _tempAllTransits = transits[productUId];

        ViewProduct memory _product;
        _product.uId = productUId;
        _product.product = _tempProduct;
        _product.allTransits = _tempAllTransits;

        return _product;
    }
}
