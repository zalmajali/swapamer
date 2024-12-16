import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";
import {UsersService} from "../../services/users.service";
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import {StoresService} from "../../services/stores.service";
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;

  public operationResult:any;
  public returnUsersData:any;
  public returnArrayUsersFromServer:any;
  public returnUsersArray:any = [];
  public countOfData:any;
  public users:any;
  public message:any;
  public allFaveUserId:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  //langSeting
  public classValData:any;
  public checkLanguage: any=0;
  public language: any;
  public dir:any;
  public balanceServse: any;
  public point: any;
  public swap: any;
  public floatD:any;
  public floatTow:any;
  public servicesListFav:any;
  public noDataTitle:any;
  public noDataSubTitle:any;
  public detailsNote:any;
  //menue
  public menuOne:any;
  public menuTow:any;
  public menuThree:any;
  public menuFor:any;
  public menuFive:any;
  constructor(private globalization: Globalization, private translate: TranslateService,private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','favourite');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  initialiseTranslation(){
    this.translate.get('classValData').subscribe((res: string) => {
      this.classValData = res;
    });
    this.translate.get('balanceServse').subscribe((res: string) => {
      this.balanceServse = res;
    });
    this.translate.get('point').subscribe((res: string) => {
      this.point = res;
    });
    this.translate.get('swap').subscribe((res: string) => {
      this.swap = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('servicesListFav').subscribe((res: string) => {
      this.servicesListFav = res;
    });
    this.translate.get('noDataTitle').subscribe((res: string) => {
      this.noDataTitle = res;
    });
    this.translate.get('noDataSubTitle').subscribe((res: string) => {
      this.noDataSubTitle = res;
    });
    this.translate.get('detailsNote').subscribe((res: string) => {
      this.detailsNote = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });

    //content

    ////menue
    this.translate.get('menuOne').subscribe((res: string) => {
      this.menuOne = res;
    });
    this.translate.get('menuTow').subscribe((res: string) => {
      this.menuTow = res;
    });
    this.translate.get('menuThree').subscribe((res: string) => {
      this.menuThree = res;
    });
    this.translate.get('menuFor').subscribe((res: string) => {
      this.menuFor = res;
    });
    this.translate.get('menuFive').subscribe((res: string) => {
      this.menuFive = res;
    });
  }
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(res =>{})
      .catch(err =>{
        this.message =  this.detailsNote;
        this.displayResult(this.message);
      });
  }
  evaluationUser(servicesId:any,userId:any){
    this.navCtrl.navigateRoot(['/evaluationuser', {servicesId:servicesId,userSelectId:userId}])
  }
  async functionGetData(userId:any=0){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await loading.present();
    this.storesService.allFaveUsers(userId).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayUsersFromServer = this.returnUsersData.Data.products;
        this.returnUsersArray=[];
        for(let i = 0; i < this.returnArrayUsersFromServer.length;i++) {
          this.returnUsersArray[i]=[];
          this.returnUsersArray[i]['id'] = this.returnArrayUsersFromServer[i].id;
          this.returnUsersArray[i]['mobile'] = this.returnArrayUsersFromServer[i].mobile;
          this.returnUsersArray[i]['mobileHide'] = this.returnArrayUsersFromServer[i].mobileHide;
          this.returnUsersArray[i]['title'] = this.returnArrayUsersFromServer[i].title;
          this.returnUsersArray[i]['points'] = this.returnArrayUsersFromServer[i].points;
          this.returnUsersArray[i]['commercialName'] = this.returnArrayUsersFromServer[i].commercialName;
          this.returnUsersArray[i]['productsImage'] = this.returnArrayUsersFromServer[i].productsImage;
          if(this.returnArrayUsersFromServer[i].productsImage == null || this.returnArrayUsersFromServer[i].productsImage == 0 || this.returnArrayUsersFromServer[i].productsImage == undefined)
            this.returnUsersArray[i]['productsImage'] = "../../assets/imgs/defThree.png";
          if(this.checkLanguage){
            if(this.language == "en"){
              this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_en;
              this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
              this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
              this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
            }
            else{
              this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_ar;
              this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
              this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
              this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if(this.language == "en"){
                this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_en;
                this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
                this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
                this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
              }
              else{
                this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_ar;
                this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
                this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
                this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if(this.language == "en"){
                  this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_en;
                  this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_en;
                  this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_en;
                  this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_en;
                }
                else{
                  this.returnUsersArray[i]['catId'] = this.returnArrayUsersFromServer[i].catId_ar;
                  this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId_ar;
                  this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId_ar;
                  this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId_ar;
                }
              }).catch(e => {console.log(e);});
            }
          }
          this.returnUsersArray[i]['rate'] = this.returnArrayUsersFromServer[i].rate;
          this.returnUsersArray[i]['show'] = 1;
        }
        let countOfData = this.returnUsersArray.length;
        if(countOfData == 0)
          this.users = 0;
        else{
          this.users = 1;
        }
      }else
        this.users = 0;
    }).catch(error=>{
      this.functionGetData(userId)
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catUserId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null  || this.fullName == null){
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    }
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
      }else{
        this.storage.remove('fullNameLogin');
        this.storage.remove('numberLogin');
        this.storage.remove('passwordLogin');
        this.storage.remove('type');
        this.storage.remove('userId');
        this.storage.remove('catId');
        this.storage.remove('subCatId');
        this.storage.remove('points');
        this.navCtrl.navigateRoot('login');
      }
    }).catch(e=>{
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
      this.displayResult(this.message);
    })
    this.allFaveUserId = await this.storage.get('bookMarks');
    let valallFaveUserId = 0
    if(this.allFaveUserId!=null && this.allFaveUserId!=undefined && this.allFaveUserId!=0 )
      valallFaveUserId = this.allFaveUserId.toString();
    this.functionGetData(valallFaveUserId);
    this.notifications();
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0])
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0])
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  async notifications(){
    this.usersService.newNotifications(this.userId).then(async data=>{
      this.returnNotfiData = data;
      this.operationResult = this.returnNotfiData.Error.ErrorCode;
      if(this.operationResult==1){
        this.newNotifications = this.returnNotfiData.Data.numSelectNotifications;
      }else{
        this.newNotifications = 0;
      }
    }).catch(e=>{
      this.newNotifications = 0;
    })
    setTimeout(()=>{
      this.notifications();
    },3500)
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/invitations");
  }
  functionGoToSendPoint(){
    this.navCtrl.navigateRoot("/sendpoint");
  }
  functionGoToArchives(){
    this.navCtrl.navigateRoot("/archives");
  }
  functionOpenAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  async functionOpenMenue(){
    let typeUser = await this.storage.get('type');
    if(typeUser == 1){
      this.menu.enable(true,"third");
      this.menu.open("third");
    }else{
      this.menu.enable(true,"last");
      this.menu.open("last");
    }
  }
  functionUserDetalis(userId:any){
    this.navCtrl.navigateRoot(['/servicesdetalis', {servicesId:userId,page:2}])
  }
  functionRemFav(servicesId:any){
    this.storesService.addFav(servicesId,2).then(async data=>{
    })
  }
  async bookMark(){
    return this.storage.get('bookMarks').then(bookmarks=>{
      if(bookmarks == null)
        bookmarks = new Array<any>();
      return bookmarks;
    });
  }
  async removeBookMark(userId:any,indexVal:any){
    await this.bookMark().then(async realVal=>{
      const index = realVal.indexOf(userId);
      if (index > -1) {
        realVal.splice(index, 1);
      }
      this.returnUsersArray[indexVal]['show'] = 0;
      await this.storage.set('bookMarks',realVal);
      this.ngOnInit();
    });
    await this.functionRemFav(userId);
  }
}
