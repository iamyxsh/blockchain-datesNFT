// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DateNFT is ERC721 {
    uint public totalDates = 0;
    address payable public admin;
    
    constructor() ERC721("Date", "DATE") {
        admin = payable(msg.sender);
    }

    struct Date {
        uint id;
        uint day;
        uint month;
        uint year;
        string title;
    }

    Date[] public dateArray;
    mapping (uint => Date) public dateIds;
    mapping (address => Date[]) public dateOwners;
    mapping (uint => bool) public isDateOwned;

    modifier isOwner {
        require(msg.sender == admin);
        _;
    }

    function mint(uint day, uint month, uint year, string memory title) isOwner public {
        totalDates++;

        dateIds[totalDates] = Date(totalDates, day, month, year, title);
        dateArray.push(Date(totalDates, day, month, year, title));
        isDateOwned[totalDates] = false;
    }

    function claim(uint id) public payable {
        require(msg.value > 0.1 ether);
        require(isDateOwned[id] != true, "Already owned by someone else. Sorry.");

        isDateOwned[id] = true;
        Date[] storage ownersDates = dateOwners[msg.sender];
        Date memory date = dateIds[id];
        ownersDates.push(date);

        admin.transfer(address(this).balance);
    }
    
    function getAllDates() view public returns(Date[] memory) {
        return dateArray;
    }
    
    function getAllOwnedDates() view public returns(Date[] memory) {
        return dateOwners[msg.sender];
    }
}