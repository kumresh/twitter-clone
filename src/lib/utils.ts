import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebase } from "./firebase";

const Utils = {
  getFormatDate: (inputDate: string): string => {
    const date = new Date(inputDate);
    const now = new Date();
  
    // Calculate the difference in milliseconds
    const timeDifference = Number(now) - Number(date);
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    // Check conditions
    if (daysDifference >= 3) {
      // If the date is 3 days or more old, return month and day
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
      const month = months[date.getMonth()];
      const day = date.getDate();
  
      return `${month} ${day}`;
    } else if (hoursDifference >= 24) {
      // If the date is 24 hours or more old, return "1 day ago"
      const daysAgo = Math.floor(hoursDifference / 24);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursDifference >= 1) {
      // If the date is at least 1 hour old, return "x hour ago"
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else {
      // If the date is less than 1 hour old, return "x minute ago"
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    }
  },  
    getFileFromBlobUrl: async (url: string, name = 'file') => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], name, { type: blob.type });
    },
    uploadImage: async (logo: string, userId: string | undefined) => {
      const logoFile = await Utils.getFileFromBlobUrl(logo);
  
      const fileName = `upload/${userId}/${userId}-${Date.now()}.png`;
      const storage = getStorage(firebase);
      const storageRef = ref(storage, fileName);
  
      const uploadResult = await uploadBytes(storageRef, logoFile);
  
      if (!uploadResult) {
        throw 'Something went wrong while Uploading';
      }
  
      const logoUrl = await getDownloadURL(uploadResult.ref);
  
      if (!logoUrl) {
        throw 'Something went wrong while Saving Logo';
      }
      return logoUrl;
    },
};

export default Utils;