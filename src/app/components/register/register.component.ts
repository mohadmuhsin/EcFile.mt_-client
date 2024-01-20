import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formData!: FormGroup;
  alertMessage!:string;
  alertTYpe!:string;  
  alert:boolean = false;
  condition: boolean = true;
  passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  role:string = ""
  imageUrl!:any

  constructor( 
    private service :AuthServiceService,
    private formBuilder: FormBuilder, 
    private router:Router
  ){}
  @ViewChild('fileInput', { static: false })fileInput!: ElementRef;

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      username:["",[Validators.required,Validators.minLength(3),]],
      email:["",[Validators.required, Validators.email]],
      mobile:["",[Validators.required, Validators.minLength(10),]],
      password:["",[Validators.required,Validators.pattern(this.passwordPattern), Validators.minLength(8)]]
    })
  }



  register(){
    
   if(this.formData.valid){
      let authData = this.formData.getRawValue()
      let number = authData.mobile + "";
      
      if (!["6", "7", "8", "9"].includes(number.charAt(0))) {
        this.alert = true
        this.condition = false
        this.alertTYpe = "Warning alert!"
        this.alertMessage = "mobile number should start with 6,7,8,9";
      }

      authData = { image: this.imageUrl, ...authData }

      this.service.register(authData).subscribe({
        next:(res:any)=>{
          this.alert = true
          this.condition = true
          this.alertTYpe = "Success alert!"
          this.alertMessage = res.message;
          setTimeout(() => {
            this.alert = false;
            this.router.navigate(['/login'])
          }, 1000);
        },
        error:(error)=>{
          console.log(error);
          this.alert = true
          this.condition = false
          this.alertTYpe = "Warning alert!"
          this.alertMessage = error.error.message;
          setTimeout(() => {
            this.condition = false
            this.alert = false;
          }, 5000);
        }
      })
    }else{
      this.alert = true
      this.condition = false
      this.alertTYpe = "Warning alert!"
      this.alertMessage = "Feilds can't be empty";
    }
  }

  async onFileSelected(event: any) {
    const selectedFile: File = event.target.files[0];
    if(selectedFile){
      try {
        const base64Data = await toBase64(selectedFile);
        this.imageUrl = base64Data
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
      
    }else{
      console.log('No file selected');
    }
    
  }

}


export const toBase64 = (image:File) =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
}).catch((err) => {
  console.log(err);
});
