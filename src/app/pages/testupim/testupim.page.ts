import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,FileEntry,Entry } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
@Component({
  selector: 'app-testupim',
  templateUrl: './testupim.page.html',
  styleUrls: ['./testupim.page.scss'],
})
export class TestupimPage implements OnInit {
  public foreFileArray:any;
  public message:any;
  public firstFileArray:any;
  public foreFileVal:any;
  constructor(private camera: Camera,private file: File,private imagePicker: ImagePicker,private toastCtrl: ToastController,private transfer: FileTransfer,private platform: Platform) {}
  uploadeForeFile(){
    const optionsD: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(optionsD).then(async(imageData) => {
      alert(JSON.stringify(imageData));
      let imageName = imageData.substring(imageData.lastIndexOf('/') + 1);
      let imageExtension = imageData.split('.').pop().toLowerCase();
      let imagemimeType: string="";
      if (imageExtension === 'jpg' || imageExtension === 'jpeg') {
        imagemimeType = "image/jpeg";
      } else if (imageExtension === 'png') {
        imagemimeType = "image/png";
      }
      else if (imageExtension === 'gif') {
        imagemimeType = "image/gif";
      }

    }, (err) => {
    });

  }

  ngOnInit() {
  }
}
