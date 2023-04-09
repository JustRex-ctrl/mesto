import {userInfoData} from '../utils/constants.js'

export class UserInfo {
  constructor() {
    const {profileName, profileJob, profileAvatar} = userInfoData;

    this._userName = document.querySelector(profileName);
    this._userJob = document.querySelector(profileJob);
    this._userAvatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    }
    return userData;
  }

  setUserInfo(userData){
    const {name, about, avatar} = userData;
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userAvatar.src = avatar
  }
}
