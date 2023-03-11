export class UserInfo {
  constructor({name, job}) {
    this._userName = name;
    this._userJob = job;
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
