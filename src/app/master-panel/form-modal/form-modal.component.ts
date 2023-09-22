import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  @Input() user
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
  genderMaleVal: boolean;
  genderFemaleVal: boolean;
  imageSrc: string = '';
  newUser = [];

  allHobbies = [
    {
      id: 1,
      name: "all",
      isSelected: false
    },
    {
      id: 2,
      name: "Programming",
      isSelected: false
    },
    {
      id: 3,
      name: "Designing",
      isSelected: false
    },
    {
      id: 4,
      name: "Dancing",
      isSelected: false
    },
    {
      id: 5,
      name: "Crafting",
      isSelected: false
    },
    {
      id: 6,
      name: "Swimming",
      isSelected: false
    }
  ]

  onGenderChange(e) {
    this.gender = e.target.value;
  }

  a = [1, 2, 6, 6, 5];


  constructor(private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.newUser.push(this.user)
    if (localStorage.getItem("users") == null) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    if (this.user) {
      this.fname = this.user.first_name;
      this.lname = this.user.last_name;
      this.age = this.user.age;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.password = this.user.password;
      this.c_password = this.user.password;
      this.about_user = this.user.description;
      this.gender = this.user.gender;

      // ----- select gender
      if (this.user.gender == "male") {
        this.genderMaleVal = true;
        this.genderFemaleVal = false;
      } else {
        this.genderFemaleVal = true;
        this.genderMaleVal = false;
      }
      // ----- Add hobbies in box
      let name = this.user.hobbies.filter(x => x).join(",")
      this.allHobbies.filter(y => {
        if (name.includes(y.name)) {
          y.isSelected = true;
          this.hobbiesArray.push(y.name);
        }
      })
      // ----- add skills on box
      for (let i = 0; i < this.user.skill.length; i++) {
        this.all_skill.push(this.user.skill[i])
      }
      // ----- select country
      this.countrySelect = this.user.c_id
      this.stateSelect = this.user.s_id
      this.citySelect = this.user.ct_id
      this.stateArray = this.state.filter(x => x.c_id == this.user.c_id)
      this.cityArray = this.city.filter(x => x.s_id == this.user.s_id);
    }
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
    console.log('event :', event);
    this.stateSelect;
    console.log('this.countrySelect :', this.countrySelect);
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
  addSKillOnEnter(e) {
    if (e.keyCode == 13) {
      this.addSkill();
    }
  }
  // =========================================All Skill Clear wwith one button
  clear_all_skill() {
    console.log('this.all_skill :', this.all_skill);
    this.toastr.error("Skill Deleted Successfully !!");
    this.all_skill = [];
  }
  // ================= Delete all skills
  delete_skill(new_skill) {
    function checkIn(index) {
      return index == new_skill;
    }
    let deleteIndex = this.all_skill.findIndex(checkIn);
    this.all_skill.splice(deleteIndex, 1)
    console.log('this.all_skill :', this.all_skill);
  }


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

  // ----------------------------- Select all checkboxes when select all -----------------------------

  hobbiesArray = [];
  updateItem(e, type) {
    if (e.target.checked) {
      if (type.id == 1) {
        this.hobbiesArray = [];
        for (let i = 0; i < this.allHobbies.length; i++) {
          this.allHobbies[i].isSelected = true;
        }
        for (let i = 1; i <= 5; i++) {
          this.hobbiesArray.push(this.allHobbies[i].name);
        }
      } else {
        this.hobbiesArray.push(type.name);
      }
      console.log(this.hobbiesArray);
    }
    else {
      if (type.id == 1) {
        this.hobbiesArray = [];
        for (let i = 0; i < this.allHobbies.length; i++) {
          this.allHobbies[i].isSelected = false;
        }
      } else {

        function findHobbie(index) {
          return index == type.name;
        }
        let index = this.hobbiesArray.findIndex(findHobbie);
        this.hobbiesArray.splice(index, 1);
      }
      console.log(this.hobbiesArray);
    }
  }

  // ----------------------------- Pass Validation -----------------------------
  pass() {
  };
  c_pass() {
  };



  // ----------------------------- Validations after submit -----------------------------
  complete_registration() {

    this.errorNote = "";
    // if (this.fname == "") {
    //   this.errorNote += "Enter Valid First Name * <br>"
    // }
    // if (this.lname == "") {
    //   this.errorNote += "Enter Valid Last Name * <br>"
    // }
    // if (!this.email.match(this.mailFormat)) {
    //   this.errorNote += "Enter Valid Email * <br>"
    // }
    // if (this.phone <= 10) {
    //   this.errorNote += "Enter Valid Mobile Number * <br/>"
    // }
    // if (!this.password.match(this.passwordFormat)) {
    //   this.errorNote += "Enter Valid Password * <br>"
    // }
    // if (this.c_password != this.password) {
    //   this.errorNote += "Confirm Password Doesn't match* <br/>"
    // }
    // if (this.gender == undefined) {
    //   this.errorNote += "Please Select gender * <br/>"
    // }
    // if (this.imageSrc == '') {
    //   this.errorNote += "Please Select Image * <br/>"
    // }
    // if (!this.countrySelect) {
    //   this.errorNote += "Please Select Country * <br/>"
    // }
    // if (!this.stateSelect) {
    //   this.errorNote += "Please Select State * <br/>"
    // }
    // if (!this.citySelect) {
    //   this.errorNote += "Please Select City * <br/>"
    // }
    // if (this.about_user.length <= 5) {
    //   this.errorNote += "Please Enter Valid Description * <br/>"
    // }
    // if (this.all_skill.length < 3) {
    //   this.errorNote += "Please Enter Atleast 3 Skills * <br/>"
    // }
    // // if (!image_src) {
    // //     this.errorNote += "Please Upload your Image * <br/>"
    // // }
    // if (this.errorNote) {
    //   this.validateError();
    // }

    if (this.errorNote == "") {
      this.allUsers = JSON.parse(localStorage.getItem('users'));
      let userId = this.user.id;
      let userRow = this.allUsers.findIndex((e) => e.id == userId);;

      // -=-=-=-=-=-=-=-=-=-=-=- Selected Country
      let selectedCountry;
      let countryValue = this.countrySelect;
      this.country.forEach((e) => {
        if (e.c_id == countryValue) {
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

      let userObj = {
        id: userId,
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
      this.allUsers.splice(userRow, 1, userObj)
      localStorage.setItem("users", JSON.stringify(this.allUsers))
      this.router.navigate(['/table'])
    }
    this.allUsers = JSON.parse(localStorage.getItem('users'))
  }
}