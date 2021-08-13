import { Component, NgZone, OnInit } from '@angular/core';
import { Chapter } from '../shared/classes/chapter';
import { ChapterService } from '../shared/chapter.service';
import { ActivatedRoute, Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {
  chapter: Chapter | any;
  chapterNumber: string;
  username: string | null;
  notificationVisible: boolean | undefined;


  constructor(private chapterService: ChapterService, private userSevice: ApiService, private route: ActivatedRoute, private ngZone: NgZone, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
    this.chapterNumber = "0";
    this.username = localStorage.getItem("loggedUserUsername")
    //get chapter number save from user
  }

  getChapter(): any {
    const chN = this.route.snapshot.paramMap.get("chNumber");
    if (chN) {
      this.notificationVisible = false;
      return this.chapterService
        .GetChapterByChapterNumber(chN)
        .pipe(
          map(
            (data) => {
              if (!data) {
                this.router.navigateByUrl('/404')
              } else {
                this.chapter = data;
              }

            }))
    }
  }

  ngOnInit(): void {
    this.getChapter().subscribe(() => {
    });

  }

  notif(): void {
    this.notificationVisible = true;
  }


  save(): void {
    const chN = this.route.snapshot.paramMap.get("chNumber");

    if (this.username) {
      this.userSevice.GetUserByUsername(this.username).subscribe(res => {
        if (res) {
          const id = res._id;
          const updatedUser = Object.assign({}, res);
          updatedUser.chapterSave = chN;
          this.userSevice.UpdateUser(id, updatedUser).subscribe(res => {
            this.ngZone.run(() => console.log("success", "user save is now", chN))
          });

        }
      });
    }
  }
}
