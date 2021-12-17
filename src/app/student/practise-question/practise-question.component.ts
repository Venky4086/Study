import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "src/app/services/student.service";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-practise-question",
  templateUrl: "./practise-question.component.html",
  styleUrls: ["./practise-question.component.css"],
})
export class PractiseQuestionComponent implements OnInit {
  name = "ngx sharebuttons";
  userId: string;
  sharableUrl: String;
  usertype: any;
  isBrd: boolean = false;
  yearsArray = [
    2000, 2001, 2002, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
    2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  showMyContainer;
  showMyContainer2;
  studsTagDTO = [];
  QuestionHistory: {
    submitCount: "";
    acceptanceCount: "";
  };
  question: any;
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private student: StudentService,
    private snackbar: MatSnackBar,
    private fb:FormBuilder
  ) {}

  // @ViewChild(MathjaxComponent) childView: MathjaxComponent;

  standardName: any;
  subjectName: any;
  topicName: any;
  sendLike = {
    liked: "",
    questionId: "",
    userId: "",
    type: "",
  };
  sendDisLike = {
    disliked: "",
    questionId: "",
    userId: "",
    type: "",
  };

  addFavPayload = {
    qid: "",
    userId: "",
  };
  fav: string;
  isAdded: any;

  LikesDislikes = { likes: "", dislikes: "" };
  LikesDisLikesInfo: any;
  likesdislikesInfoDTO: any;
  liked: boolean;
  disliked: boolean;

  title;
  qDetailsId;
  qDetails = <any>[];
  selectedCorectAnswersArray = [];
  timeLeft: number = 0;
  interval;
  isSubmitted: boolean;
  actualCorrectAnswers = [];
  isCorrect: boolean;
  Appeared:FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.Appeared = this.fb.group({
      exam_name:['', Validators.required],
      year:['', Validators.required]
    });
    if (this.route.snapshot.params.id) {
      this.isBrd = true;
      sessionStorage.setItem("questionsView", this.route.snapshot.params.id);
      this.qDetailsId = this.route.snapshot.params.id;
      console.log(this.route.snapshot.params.id);
    } else {
      this.qDetailsId = this.route.snapshot.params.id;
    }
    this.standardName = sessionStorage.getItem("standardName");
    this.subjectName = sessionStorage.getItem("subjectName");
    this.topicName = sessionStorage.getItem("topicName");
    this.route.data.subscribe((data) => {
      console.log(data);
    });

    this.start();

    this.sharableUrl =
      "https://studyamaze.com/share-preview-page/" + this.qDetailsId;
    this.userId = sessionStorage.getItem("userid");
    this.usertype = "PC";
    console.log(this.qDetailsId);

    this.questiondata();

    this.student
      .checkIfWhishListed(this.qDetailsId, this.userId)
      .subscribe((data) => {
        console.log(data);
        this.isAdded = data;
        if (this.isAdded.status) {
          // this.fav="Delete from list";
        } else {
          // this.fav="Add to list";
        }
      });

    this.student
      .getLikesDislikes(this.qDetailsId, this.userId, this.usertype)
      .subscribe((data) => {
        console.log(data);
        this.LikesDisLikesInfo = data;

        this.LikesDislikes.likes = this.LikesDisLikesInfo.likes;
        this.LikesDislikes.dislikes = this.LikesDisLikesInfo.dislikes;
        this.likesdislikesInfoDTO = this.LikesDisLikesInfo.likeDislikeInfoDTO;

        if (this.likesdislikesInfoDTO.liked == 0) {
          this.liked = false;
        } else {
          this.liked = true;
        }
        if (this.likesdislikesInfoDTO.disliked == 0) {
          this.disliked = false;
        } else {
          this.disliked = true;
        }
        console.log(this.likesdislikesInfoDTO);
        console.log("OWN", this.LikesDislikes);
      });
    this.student.getQuestionById(this.qDetailsId).subscribe(
      (res) => {
        this.qDetails = res;
        console.log("question complete details frm db", res);
        sessionStorage.setItem("subjectName",this.qDetails.subject);
        sessionStorage.setItem("topicName",this.qDetails.topic);
        this.subjectName = this.qDetails.subject;
        this.topicName = this.qDetails.topic;
        this.question = this.qDetails.question;
        // this.aa=this.qDetails.quesiton;
        this.actualCorrectAnswers =
          this.qDetails.answersDTO.correctOption.split(",");
        console.log("question retrived form db: ", this.actualCorrectAnswers);
      },
      (err) =>
        console.log("Error occured while retriving quesiton from db: ", err)
    );
  }
 get A(){
   return this.Appeared.controls
 }
  // Likes and Dislikes

  Like() {
    // if(this.likesdislikesInfoDTO.disliked==1){
    //   console.log("executing disLike function")
    //   this.disLike();
    // }
    this.sendLike.liked = "1";
    this.sendLike.questionId = this.qDetailsId;
    this.sendLike.userId = sessionStorage.getItem("userid");
    this.sendLike.type = "PC";
    console.log(this.sendLike);
    this.student.postLike(this.sendLike).subscribe((data) => {
      console.log(data);
      console.log("uploaded");
      this.student
        .getLikesDislikes(this.qDetailsId, this.userId, this.usertype)
        .subscribe((data) => {
          console.log(data);
          this.LikesDisLikesInfo = data;
          this.LikesDislikes.likes = this.LikesDisLikesInfo.likes;
          this.LikesDislikes.dislikes = this.LikesDisLikesInfo.dislikes;
          this.likesdislikesInfoDTO = this.LikesDisLikesInfo.likeDislikeInfoDTO;
          if (this.likesdislikesInfoDTO.liked == 0) {
            this.liked = false;
          } else {
            this.liked = true;
          }
          if (this.likesdislikesInfoDTO.disliked == 0) {
            this.disliked = false;
          } else {
            this.disliked = true;
          }
        });
    });
    console.log("Like working");
  }

  // Dislike

  disLike() {
    // if(this.likesdislikesInfoDTO.liked==1){
    //   console.log("executing Like function")
    //   this.Like();
    // }
    this.sendDisLike.disliked = "1";
    this.sendDisLike.questionId = this.qDetailsId;
    this.sendDisLike.userId = sessionStorage.getItem("userid");
    this.sendDisLike.type = "PC";
    this.student.postDisLike(this.sendDisLike).subscribe((data) => {
      console.log(data);
      console.log("uploaded");
      this.student
        .getLikesDislikes(this.qDetailsId, this.userId, this.usertype)
        .subscribe((data) => {
          this.LikesDisLikesInfo = data;
          this.LikesDislikes.likes = this.LikesDisLikesInfo.likes;
          this.LikesDislikes.dislikes = this.LikesDisLikesInfo.dislikes;
          this.likesdislikesInfoDTO = this.LikesDisLikesInfo.likeDislikeInfoDTO;
          if (this.likesdislikesInfoDTO.liked == 0) {
            this.liked = false;
          } else {
            this.liked = true;
          }
          if (this.likesdislikesInfoDTO.disliked == 0) {
            this.disliked = false;
          } else {
            this.disliked = true;
          }
        });
    });

    console.log("disLike working");
  }

  // WishList
  addToList() {
    // this.fav="Delete from list";
    this.isAdded.status = true;
    this.addFavPayload.qid = this.qDetailsId;
    this.addFavPayload.userId = sessionStorage.getItem("userid");
    this.student.addToWishList(this.addFavPayload).subscribe((data) => {
      console.log(data);
    });
  }

  questiondata() {
    this.student.getQuestionData(this.qDetailsId).subscribe((data: any) => {
      this.QuestionHistory = data;
      console.log(this.QuestionHistory);
      this.studsTagDTO = data.studsTagDTO;
    });
  }

  deleteFromList() {
    // this.fav="Add to list";
    this.isAdded.status = false;
    this.addFavPayload.qid = this.qDetailsId;
    this.addFavPayload.userId = sessionStorage.getItem("userid");
    this.student.removeFromWishList(this.addFavPayload).subscribe((data) => {
      console.log(data);
    });
  }

  start() {
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft >= 0) {
        this.timeLeft++;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  updateSelectedOptionsArray(option) {
    console.log(option);
    this.selectedCorectAnswersArray.pop();
    console.log("pop", this.selectedCorectAnswersArray);
    this.selectedCorectAnswersArray.push(option);
    console.log("option", this.selectedCorectAnswersArray);
  }

  validateAndProcess() {
    let iscorrect;
    let payload = {
      practiseQid: this.qDetailsId,
      userId: sessionStorage.getItem("userid"),
      solution: this.selectedCorectAnswersArray.toString(),
      timeTaken: this.timeLeft,
    };
    console.log(payload);
    this.student.submitSolution(payload).subscribe(
      (res) => {
        console.log("data posted successfully", res);
        this.snackbar.open("Submitted succesfully", "close", {
          duration: 3000,
        });
        this.router.navigate(["student/qhistory"]);
      },
      (err) => console.log("Error occured while submiting solution.", err)
    );
  }

  postTag(name, year) {
    this.submitted = true;
    console.log(this.qDetailsId);
    console.log(name, year);
    let tagData = {
      appYear: 0,
      examsAppeared: "",
      qId: 0,
    };
    tagData.appYear = year;
    tagData.examsAppeared = name;
    tagData.qId = this.qDetailsId;
    console.log(tagData);
    this.student.postTagForQuestion(tagData).subscribe((data: any) => {
      console.log(data);
      this.snackbar.open(data.message, "close", {
        duration: 3000,
      });
      this.Appeared.reset();
      this.submitted = false;
      this.questiondata();
    },(error)=>{
      console.log(error);
      this.Appeared.reset();
      this.submitted = false;
    });
  }

  goToDashboard() {
    this.router.navigate(["student/dashboard"]);
  }

  goToQuestions() {
    this.router.navigate(["student/practise"]);
  }

  goToStandards() {
    this.router.navigate(["student/study"]);
  }

  goToSubjects() {
    this.router.navigate(["student/study"]);
  }

  goToTopics() {
    this.router.navigate(["student/topics"]);
  }
  
  goBack(){
    this._location.back();
  }

share(){
  // window.location.url = 'https://web.whatsapp.com/send?text=www.google.com';
  window.open('https://web.whatsapp.com/send?text=https://studyamaze.com/#/student/practise-question');
}
}
