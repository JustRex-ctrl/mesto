import {userInfoData} from './constants.js'

export class UserInfo {
  constructor() {
    const {profileName, profileJob} = userInfoData;

    this._userName = document.querySelector(profileName);
    this._userJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    }
    return userData;
  }

  setUserInfo(userData){
    const {username, job} = userData;
    this._userName.textContent = username;
    this._userJob.textContent = job;
  }
}
