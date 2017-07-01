import { Component, Input, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bootcamp-embed',
  templateUrl: './bootcamp-embed.component.html',
  styleUrls: ['./bootcamp-embed.component.css']
})
export class BootcampEmbedComponent implements OnInit {

  @Input() album: number;
  @Input() song: number;

  public errorOccured = false;
  public iframeSrc;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.album || !this.song) {
      this.errorOccured = true;
    } else {
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://bandcamp.com/EmbeddedPlayer/album=${this.album}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=${this.song}/transparent=true/`);
    }
  }

}
