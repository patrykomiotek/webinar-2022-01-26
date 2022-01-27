import { useState, useEffect } from 'react';
import type { MouseEventHandler, ChangeEventHandler } from 'react';
import { ethers } from 'ethers';
import { Box, Text, Divider, Link, Input, Button } from '@chakra-ui/react';

import abi from '../../abi/webamigo.json';

const defaultExternalAccount = '0x8921E6c0aF2f45C226e89766EFA1b71b5a8D16b5';
// https://ropsten.etherscan.io/address/0x0A886eDEaA9C2Dc35998BBdfa39a72B42e862761
const customTokenAddress = '0x0A886eDEaA9C2Dc35998BBdfa39a72B42e862761';

function Dashboard() {
  // TODO: reduce number of separate state values
  const [address, setAddress] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [externalAddress, setExternalAddress] = useState<string>(defaultExternalAccount);
  const [externalAddressEthAmount, setExternalAddressEthAmount] = useState<string>('');
  const [customTokenAmount, setCustomTokenAmount] = useState<string>('');
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const loadData = async () => {
    const signer = provider.getSigner();

    const blockNumber = await provider.getBlockNumber();
    setBlockNumber(blockNumber);

    // https://docs.metamask.io/guide/rpc-api.html#permissions
    await provider.send('eth_requestAccounts', []);

    const myAddress = await signer.getAddress();
    setAddress(myAddress);

    const myBalance = await signer.getBalance();
    setEthAmount(ethers.utils.formatEther(myBalance));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckExternalAccount: MouseEventHandler<HTMLButtonElement> = async () => {
    const isAddress = ethers.utils.isAddress(externalAddress);
    if (isAddress) {
      const balance = await provider.getBalance(externalAddress);
      setExternalAddressEthAmount(ethers.utils.formatEther(balance));
    }
  };

  const handleCheckCustomTokenAmount: MouseEventHandler<HTMLButtonElement> = async () => {
    const erc20 = new ethers.Contract(customTokenAddress, abi, provider);
    const isAddress = ethers.utils.isAddress(externalAddress);
    if (isAddress) {
      const erc20Balance = await erc20.balanceOf(address);
      setCustomTokenAmount(ethers.utils.formatEther(erc20Balance));
    }
  };

  const handleChangeExternalAddress: ChangeEventHandler<HTMLInputElement> = (event) => {
    setExternalAddress(event.target.value);
  };

  // TODO: implement by yourself ;)
  // const handleSentTransaction: MouseEventHandler<HTMLButtonElement> = async () => {
  // 0x8921E6c0aF2f45C226e89766EFA1b71b5a8D16b5
  // const tx = signer.sendTransaction({
  //   to: "0x8921E6c0aF2f45C226e89766EFA1b71b5a8D16b5",
  //   value: ethers.utils.parseEther("3.0")
  // });
  // };

  return (
    <Box>
      <Box mb={6}>
        <Text fontSize="2xl">My wallet</Text>
        <Text>
          Account: {address} (
          <Link href={`https://ropsten.etherscan.io/address/${address}`} isExternal>
            view on etherscan
          </Link>
          )
        </Text>
        <Text>Value: {ethAmount}</Text>
        <Text>Last block number {blockNumber}</Text>
        <Divider />
      </Box>
      <Box mb={6}>
        <Text fontSize="2xl">Check external account</Text>
        <Input placeholder={externalAddress} onChange={handleChangeExternalAddress} />
        <Button onClick={handleCheckExternalAccount}>Check</Button>
        <Text>Value: {externalAddressEthAmount}</Text>
        <Divider />
      </Box>
      <Box mb={6}>
        <Text fontSize="2xl">
          Check{' '}
          <Link
            href="https://ropsten.etherscan.io/address/0x0A886eDEaA9C2Dc35998BBdfa39a72B42e862761"
            isExternal
          >
            Web Amigo
          </Link>{' '}
          amount
        </Text>
        <Button onClick={handleCheckCustomTokenAmount}>Check</Button>
        <Text>Value: {customTokenAmount}</Text>
      </Box>
    </Box>
  );
}

export { Dashboard };
