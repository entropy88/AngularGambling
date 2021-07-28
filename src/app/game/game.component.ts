import { Component, OnInit } from '@angular/core';
import { Chapter } from '../shared/chapter';
import { ChapterService } from '../shared/chapter.service';
import { ActivatedRoute } from "@angular/router";
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  chapter: Chapter | any;
  chapterNumber: string;

  constructor(private chapterService: ChapterService, private route: ActivatedRoute) {
    this.chapterNumber = "0";
    //get chapter number save from user
  }

  getChapter(): any {
    console.log("hello")
    const chN = this.route.snapshot.paramMap.get("chNumber");
    if (chN) {
      return this.chapterService
        .GetChapterByChapterNumber(chN)
        .pipe(
          map(
            (data) => {
              this.chapter = data;

            }))

    }
  }

  ngOnInit(): void {
    this.getChapter().subscribe(() => {
      console.log('ngOnit after getChapter() ' + this.chapter);
    });

  }
}
