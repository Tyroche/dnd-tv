import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtube-embed.component.html',
  styleUrls: ['./youtube-embed.component.css']
})
export class YoutubeEmbedComponent implements OnInit {

  @Input() id: number;

  public errorOccured = false;
  public iframeSrc;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.id) {
      this.errorOccured = true;
    } else {
      console.log(this.id);
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.id}?ecver=2`);
    }
  }

}
