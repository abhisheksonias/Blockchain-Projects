// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmSupplyChain {

    struct FarmProduct {
        uint256 productId;
        string productDescription;
        string producerName;
        string producerAddress;
        string harvestDate;

        string distributorName;
        string distributorAddress;
        string prodToDistDate;

        string retailerName;
        string retailerAddress;
        string distToRetaDate;
    }

    mapping(uint256 => FarmProduct) public products;

    event ProductAdded(uint256 productId, string producerName);
    event TransferredToDistributor(uint256 productId, string distributorName);
    event TransferredToRetailer(uint256 productId, string retailerName);

    function addNewProduct(
        uint256 _productId,
        string memory _productDescription,
        string memory _producerName,
        string memory _producerAddress,
        string memory _harvestDate
    ) public {
        require(products[_productId].productId == 0, "Product already exists");

        products[_productId] = FarmProduct({
            productId: _productId,
            productDescription: _productDescription,
            producerName: _producerName,
            producerAddress: _producerAddress,
            harvestDate: _harvestDate,
            distributorName: "",
            distributorAddress: "",
            prodToDistDate: "",
            retailerName: "",
            retailerAddress: "",
            distToRetaDate: ""
        });

        emit ProductAdded(_productId, _producerName);
    }

    function transferToDistributor(
        uint256 _productId,
        string memory _distributorName,
        string memory _distributorAddress,
        string memory _prodToDistDate
    ) public {
        require(products[_productId].productId != 0, "Product not found");

        products[_productId].distributorName = _distributorName;
        products[_productId].distributorAddress = _distributorAddress;
        products[_productId].prodToDistDate = _prodToDistDate;

        emit TransferredToDistributor(_productId, _distributorName);
    }

    function transferToRetailer(
        uint256 _productId,
        string memory _retailerName,
        string memory _retailerAddress,
        string memory _distToRetaDate
    ) public {
        require(products[_productId].productId != 0, "Product not found");
        require(bytes(products[_productId].distributorName).length > 0, "Product not transferred to distributor");

        products[_productId].retailerName = _retailerName;
        products[_productId].retailerAddress = _retailerAddress;
        products[_productId].distToRetaDate = _distToRetaDate;

        emit TransferredToRetailer(_productId, _retailerName);
    }

    function getProductDetails(uint256 _productId) public view returns (FarmProduct memory) {
        require(products[_productId].productId != 0, "Product not found");
        return products[_productId];
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmSupplyChain {

    struct FarmProduct {
        uint256 productId;
        string productDescription;
        string producerName;
        string producerAddress;
        string harvestDate;

        string distributorName;
        string distributorAddress;
        string prodToDistDate;

        string retailerName;
        string retailerAddress;
        string distToRetaDate;
    }

    mapping(uint256 => FarmProduct) public products;

    event ProductAdded(uint256 productId, string producerName);
    event TransferredToDistributor(uint256 productId, string distributorName);
    event TransferredToRetailer(uint256 productId, string retailerName);

    function addNewProduct(
        uint256 _productId,
        string memory _productDescription,
        string memory _producerName,
        string memory _producerAddress,
        string memory _harvestDate
    ) public {
        require(products[_productId].productId == 0, "Product already exists");

        products[_productId] = FarmProduct({
            productId: _productId,
            productDescription: _productDescription,
            producerName: _producerName,
            producerAddress: _producerAddress,
            harvestDate: _harvestDate,
            distributorName: "",
            distributorAddress: "",
            prodToDistDate: "",
            retailerName: "",
            retailerAddress: "",
            distToRetaDate: ""
        });

        emit ProductAdded(_productId, _producerName);
    }

    function transferToDistributor(
        uint256 _productId,
        string memory _distributorName,
        string memory _distributorAddress,
        string memory _prodToDistDate
    ) public {
        require(products[_productId].productId != 0, "Product not found");

        products[_productId].distributorName = _distributorName;
        products[_productId].distributorAddress = _distributorAddress;
        products[_productId].prodToDistDate = _prodToDistDate;

        emit TransferredToDistributor(_productId, _distributorName);
    }

    function transferToRetailer(
        uint256 _productId,
        string memory _retailerName,
        string memory _retailerAddress,
        string memory _distToRetaDate
    ) public {
        require(products[_productId].productId != 0, "Product not found");
        require(bytes(products[_productId].distributorName).length > 0, "Product not transferred to distributor");

        products[_productId].retailerName = _retailerName;
        products[_productId].retailerAddress = _retailerAddress;
        products[_productId].distToRetaDate = _distToRetaDate;

        emit TransferredToRetailer(_productId, _retailerName);
    }

    function getProductDetails(uint256 _productId) public view returns (FarmProduct memory) {
        require(products[_productId].productId != 0, "Product not found");
        return products[_productId];
    }
}
