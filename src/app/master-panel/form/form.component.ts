import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fname = "";
  lname = "";
  age: number;
  email = "";
  phone: number;
  password = "";
  c_password = "";
  skill = "";
  about_user = "";
  mailFormat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
  gender: any;
  countrySelect: number;
  stateSelect: number;
  citySelect: number;
  stateArray: { c_id: number; s_id: number; state: string; }[];
  cityArray: { ct_id: number; s_id: number; city: string; }[];
  allUsers;
  imageSrc: string = '';

    // ----------------------------- Country State City Dropdown -----------------------------
  country = [
    { c_id: 1, country: "India" },
    { c_id: 2, country: "America" },
    { c_id: 3, country: "London" },
    { c_id: 4, country: "Australia" }
  ];
  state = [
    { c_id: 1, s_id: 1, state: "Gujarat" },
    { c_id: 1, s_id: 2, state: "Maharashtra" },
    { c_id: 2, s_id: 3, state: "California" },
    { c_id: 2, s_id: 4, state: "Hawaii" },
    { c_id: 3, s_id: 5, state: "England" },
    { c_id: 3, s_id: 6, state: "Paris" },
    { c_id: 4, s_id: 7, state: "Victoria" },
    { c_id: 4, s_id: 8, state: "Vales" },
  ];
  city = [
    { ct_id: 1, s_id: 1, city: "Surat" },
    { ct_id: 2, s_id: 1, city: "Ahmedabad" },
    { ct_id: 3, s_id: 1, city: "Vadodara" },
    { ct_id: 4, s_id: 1, city: "Gandhinagar" },
    { ct_id: 5, s_id: 2, city: "Thane" },
    { ct_id: 6, s_id: 2, city: "Mumbai" },
    { ct_id: 7, s_id: 2, city: "Raigad" },
    { ct_id: 8, s_id: 2, city: "Satara" },
    { ct_id: 9, s_id: 2, city: "Kolhaput" },
    { ct_id: 10, s_id: 3, city: "Ukiah" },
    { ct_id: 11, s_id: 3, city: "Redding" },
    { ct_id: 12, s_id: 3, city: "Palm Desert" },
    { ct_id: 13, s_id: 3, city: "Santa Cruz" },
    { ct_id: 14, s_id: 3, city: "Berkeley" },
    { ct_id: 15, s_id: 4, city: "Lahaina" },
    { ct_id: 16, s_id: 4, city: "Kailua" },
    { ct_id: 17, s_id: 4, city: "Pearl" },
    { ct_id: 18, s_id: 4, city: "Kapolei" },
    { ct_id: 19, s_id: 4, city: "Kihei" },
    { ct_id: 20, s_id: 5, city: "London" },
    { ct_id: 21, s_id: 5, city: "Liverpool" },
    { ct_id: 22, s_id: 6, city: "France" },
    { ct_id: 23, s_id: 6, city: "Rome" },
    { ct_id: 24, s_id: 7, city: "Melbourne" },
    { ct_id: 25, s_id: 7, city: "Horsham" },
    { ct_id: 26, s_id: 8, city: "witch" },
    { ct_id: 27, s_id: 8, city: "The high road" },
  ];


  onGenderChange(e) {
    this.gender = e.target.value;
  }

  a = [1, 2, 6, 6, 5];


  constructor(private toastr: ToastrService, private router:Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("users") == null) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    this.allUsers = JSON.parse(localStorage.getItem("users"));
  }

  // ------------- Image Upload BASE64

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }

  // ---- State Select
  selectState(event) {
    this.stateSelect;
    if (event.target.value) {
      this.stateArray = this.state.filter(x => x.c_id == event.target.value);
    }
  }

  // ---- City Select
  selectCity(event) {
    this.citySelect;
    if (event.target.value) {
      this.cityArray = this.city.filter(x => x.s_id == event.target.value);
      console.log('this.cityArray :', this.cityArray);
    }
  }


  errorNote = "";
  validateError() {
    this.toastr.warning(this.errorNote, '', {
      enableHtml: true
    });
  }

  // ----------------------------- For Adding new skill in the skill box -----------------------------
  all_skill = [];

  addSkill() {
      if (this.skill) {
        this.toastr.success("Skill Added Successfully");
          let new_skill = this.skill.trim();
          this.all_skill.push(new_skill)
          console.log('new_skill :', new_skill);

          let added_skill = this.all_skill[this.all_skill.length - 1];
          this.skill = "";
      } else {
        this.toastr.warning("Plese Enter Skill !!");
      }
  }
  //------- Add Skill on Enter
  addSKillOnEnter(e){
    if(e.keyCode == 13){
      this.addSkill();
    }
  }
  // =========================================All Skill Clear wwith one button
  clear_all_skill(){
    console.log('this.all_skill :', this.all_skill);
        this.toastr.error("Skill Deleted Successfully !!");
        this.all_skill = [];
  }
  // ================= Delete all skills
  delete_skill(new_skill){
    function checkIn(index){
      return index==new_skill;
    }
    let deleteIndex = this.all_skill.findIndex(checkIn);
    this.all_skill.splice(deleteIndex,1)
    console.log('this.all_skill :', this.all_skill);
  }




  // ----------------------------- Select all checkboxes when select all -----------------------------
  allHobbies = [
    {
      id: 1,
      name: "all",
      isSelected:false
    },
    {
      id: 2,
      name: "Programming",
      isSelected:false
    },
    {
      id: 3,
      name: "Designing",
      isSelected:false
    },
    {
      id: 4,
      name: "Dancing",
      isSelected:false
    },
    {
      id: 5,
      name: "Crafting",
      isSelected:false
    },
    {
      id: 6,
      name: "Swimming",
      isSelected:false
    }
  ]
  hobbiesArray = [];
  updateItem(e, type) {
    if (e.target.checked) {
      if(type.id == 1){
        this.hobbiesArray = [];
        this.allHobbies[1].isSelected = true;
        for (let i = 0; i < this.allHobbies.length; i++)   {
          this.allHobbies[i].isSelected = true;
          console.log(i);
        }
        for(let i=1;i<=5;i++){
          this.hobbiesArray.push(this.allHobbies[i].name);
        }
  console.log('hobbiesArray :', this.hobbiesArray);
      }else{
        this.hobbiesArray.push(type.name);
  console.log('hobbiesArray :', this.hobbiesArray);
      }
    }
    else {
      if(type.id == 1){
        this.hobbiesArray =[];
        for (let i = 0; i < this.allHobbies.length; i++) {
          this.allHobbies[i].isSelected = false;
        }
  console.log('hobbiesArray :', this.hobbiesArray);
      }else{
        this.allHobbies[0].isSelected = false;
        function findHobbie(index){
          return index == type.name;
        }
        let index = this.hobbiesArray.findIndex(findHobbie);
        this.hobbiesArray.splice(index, 1);
  console.log('hobbiesArray :', this.hobbiesArray);
      }
    }
  }

  // ----------------------------- Pass Validation -----------------------------
  pass() {};
  c_pass() {};



  // ----------------------------- Validations after submit -----------------------------
  complete_registration() {

    this.errorNote = "";
    if (this.fname == "") {
      this.errorNote += "Enter Valid First Name * <br>"
    }
    if (this.lname == "") {
      this.errorNote += "Enter Valid Last Name * <br>"
    }
    if (!this.email.match(this.mailFormat)) {
      this.errorNote += "Enter Valid Email * <br>"
    }
    if (this.phone <= 10) {
      this.errorNote += "Enter Valid Mobile Number * <br/>"
    }
    if (!this.password.match(this.passwordFormat)) {
      this.errorNote += "Enter Valid Password * <br>"
    }
    if (this.c_password != this.password) {
      this.errorNote += "Confirm Password Doesn't match* <br/>"
    }
    if (this.gender == undefined) {
      this.errorNote += "Please Select gender * <br/>"
    }
    if (this.imageSrc == '') {
        this.errorNote += "Please Select Image * <br/>"
    }
    if (!this.countrySelect) {
        this.errorNote += "Please Select Country * <br/>"
    }
    if (!this.stateSelect) {
        this.errorNote += "Please Select State * <br/>"
    }
    if (!this.citySelect) {
        this.errorNote += "Please Select City * <br/>"
    }
    if (this.about_user.length <= 5) {
        this.errorNote += "Please Enter Valid Description * <br/>"
    }
    if (this.all_skill.length < 3) {
        this.errorNote += "Please Enter Atleast 3 Skills * <br/>"
    }
    // if (!image_src) {
    //     this.errorNote += "Please Upload your Image * <br/>"
    // }
    if (this.errorNote) {
      this.validateError();
    }

    if (this.errorNote == "") {
        // -=-=-=-=-=-=-=-=-=-=-=- Selected Country
        let selectedCountry;
        let countryValue = this.countrySelect;
        this.country.forEach((e)=>{
          if(e.c_id == countryValue){
            selectedCountry = e.country;
          }
        })

        // -=-=-=-=-=-=-=-=-=-=-=- Selected State
        let selectedState;
        let stateValue = this.stateSelect;
        this.state.filter(a => stateValue == a.s_id).map((e) => {
            selectedState = e.state;
        });
        // // -=-=-=-=-=-=-=-=-=-=-=- Selected City
        let selectedCity;
        let cityValue = this.citySelect;
        this.city.filter(a => cityValue == a.ct_id).map((e) => {
          selectedCity = e.city;
        });

        let arr = [];
        this.allUsers.map((e)=>{
            arr.push(e.id);
        });

        for(let i=0;i<arr.length;i++){
            for(let j=i+1;j<arr.length;j++){
                if(arr[i] > arr[j]){
                    let a = arr[j];
                    arr[j] = arr[i];
                    arr[j] = a;
                }
            }
        }

        let lastIndexArr;
        for(let i=0;i<arr.length;i++){
            lastIndexArr = arr[i];
        }
        if(lastIndexArr == undefined){
            lastIndexArr = -1
        }
        let userObj = {
            id: lastIndexArr + 1,
            first_name: this.fname,
            last_name: this.lname,
            age: this.age,
            email: this.email,
            phone: this.phone,
            password: this.password,
            gender: this.gender,
            hobbies: this.hobbiesArray,
            skill: this.all_skill,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            description: this.about_user,
            c_id: countryValue,
            s_id: stateValue,
            ct_id: cityValue,
            // image_url : image_src
        }
        this.allUsers.push(userObj)
        localStorage.setItem("users", JSON.stringify(this.allUsers));
        this.router.navigate(['./table']);
    }
  };

}
