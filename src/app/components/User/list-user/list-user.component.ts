import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
 listUser!:User[]
 idUser! : number; 
 showModal = false;

 user: User = new User();


  //passwordEncoder: any;
 constructor(private userservice:UserService, private route:Router){}


  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe(
      res=>{
        console.log("res",res);
        this.listUser=res
      }
    )
  }

  UpdateUser(){
    this.userservice.updateUser(this.idUser , this.user ).subscribe((response)=>{
      this.userservice.getAllUsers().subscribe(
        res=>{
          console.log("res",res);
 
          this.listUser=res
        }
      )

    })
    this.route.navigate(['/listUser'])
  
  }

  closeModal() {
    this.showModal = false;
  }


 






deleteUser(id : number){
    
  this.userservice.deleteUser(id).subscribe((response)=> {
    this.userservice.getAllUsers().subscribe(
      res=>{
        console.log("res",res);
        
        this.listUser=res
      }
    )
    
  })
}


createUser(): void {
  this.userservice.createUser(this.user)
    .subscribe(response => {
      console.log(response);
      
      // Faire quelque chose avec la réponse
      // (rediriger vers une autre page, afficher un message de confirmation, etc.)
      this.userservice.getAllUsers().subscribe(
        res=>{
          console.log("res",res);
          this.listUser=res
        }
      )
    });


  }


  getId(id : number){
    this.idUser = id;
    this.userservice.getUserById(id).subscribe((data)=>{
      this.user = data      
    })
  }


}