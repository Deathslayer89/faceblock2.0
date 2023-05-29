import { ethers } from "ethers";
import contractABI from './contractABI.json'
// const contractAddress = "0x35084EB00aF846Fb4C6DfD8e9BE9DD288De00A25"
const contractAddress="0x2997590435992c894e1f1561421d659e7a597c6c"
export async function initInstructor(course) {
  console.log('step1')
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('step2')
    try {
      const signer = provider.getSigner();
      console.log(signer)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(contract)
      const tx = await contract.setInstructor(course);
      await tx.wait();
      console.log(tx);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("MetaMask is not installed or not running.");
    return false;
  }
}
export async function getInstructor(course) {

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
      const result = await contract.getInstructor(course);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("MetaMask is not installed or not running.");
    return false;
  }
}
export async function getAttendanceData(course,classIndex,rollNo) {

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
      const result = await contract.getAttendanceData(course,classIndex,rollNo);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("MetaMask is not installed or not running.");
    return false;
  }
}
export async function setAttendance(course, classIndex, attendanceValue) {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.setAttendance(course, classIndex, attendanceValue,{gasLimit:10000000});
      await tx.wait();
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("MetaMask is not installed or not running.");
    return false;
  }
}
export async function editAttendance(course, classIndex, attendanceValue) {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.editAttendance(course, classIndex, attendanceValue,{gasLimit:10000000});
      await tx.wait();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("MetaMask is not installed or not running.");
    return false;
  }
}