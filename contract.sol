/**
 *Submitted for verification at dynoscan.io on 2022-01-14
 */

pragma solidity ^0.4.24;

// SPDX-License-Identifier: GPL-3.0-or-later and MIT
//Safe Math Interface

contract SafeMath {
    function safeAdd(uint256 a, uint256 b) public pure returns (uint256 c) {
        c = a + b;
        require(c >= a);
    }

    function safeSub(uint256 a, uint256 b) public pure returns (uint256 c) {
        require(b <= a);
        c = a - b;
    }

    function safeMul(uint256 a, uint256 b) public pure returns (uint256 c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function safeDiv(uint256 a, uint256 b) public pure returns (uint256 c) {
        require(b > 0);
        c = a / b;
    }
}

//ERC Token Standard #20 Interface

contract ERC20Interface {
    function totalSupply() public constant returns (uint256);

    function balanceOf(address tokenOwner)
        public
        constant
        returns (uint256 balance);

    function allowance(address tokenOwner, address spender)
        public
        constant
        returns (uint256 remaining);

    function transfer(address to, uint256 tokens) public returns (bool success);

    function approve(address spender, uint256 tokens)
        public
        returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint256 tokens);
    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
}

//Contract function to receive approval and execute function in one call

contract ApproveAndCallFallBack {
    function receiveApproval(
        address from,
        uint256 tokens,
        address token,
        bytes data
    ) public;
}

//Actual token contract

contract ERC20 is ERC20Interface, SafeMath {
    string public symbol;
    string public name;
    uint8 public decimals;
    uint256 public _totalSupply;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor(string memory _symbol, string memory _name) public {
        symbol = _symbol;
        name = _name;
        decimals = 18;
        _totalSupply = 200000000000 * 10**18;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public constant returns (uint256) {
        return _totalSupply - balances[address(0)];
    }

    function balanceOf(address tokenOwner)
        public
        constant
        returns (uint256 balance)
    {
        return balances[tokenOwner];
    }

    function transfer(address to, uint256 tokens)
        public
        returns (bool success)
    {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint256 tokens)
        public
        returns (bool success)
    {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) public returns (bool success) {
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender)
        public
        constant
        returns (uint256 remaining)
    {
        return allowed[tokenOwner][spender];
    }

    function approveAndCall(
        address spender,
        uint256 tokens,
        bytes data
    ) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(
            msg.sender,
            tokens,
            this,
            data
        );
        return true;
    }

    function() public payable {
        revert();
    }
}

contract Faucet {
    ERC20 public tdyno;
    address private owner = address(0x37C20ed2E1845ED3160Be17f7A67cB95119A0282);

    constructor(ERC20 _tdyno) public {
        tdyno = _tdyno;
    }

    // Safe Token transfer function, just in case if rounding error causes pool to not have enough tDYNO coin.
    function extractToken() public payable {
        require(
            tdyno.balanceOf(msg.sender) <= 5 * 10**18,
            "You're balance is more than 5"
        );
        uint256 tdynoBal = tdyno.balanceOf(address(this));
        require(tdynoBal >= 20 * 10**18, "Faucet Empty");
        tdyno.transfer(msg.sender, 1 * 10**18);
    }

    function transferToOwner() public payable {
        require(msg.sender == owner, "owner required");
        uint256 tdynoBal = tdyno.balanceOf(address(this));
        tdyno.transfer(msg.sender, tdynoBal);
    }

    function() public payable {
        revert();
    }
}
