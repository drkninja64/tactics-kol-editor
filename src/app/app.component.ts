import {Component, ViewChild} from '@angular/core';
import {CharacterModel} from "./models/character.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'tactics';

  @ViewChild('display') private outputElement: any;
  private validExtension = ['sav', 'sv1'];
  private fileBuffer: Array<number> = [];
  public characters: CharacterModel[] = [];


// Check if valid file
  private validateFile(file: File) {
    let extension = file.name.split('.')[1];
    if (!this.validExtension.includes(extension)) {
      throw "Invalid extension";
    }
    this.outputElement.nativeElement.innerText = file.name;
    var reader = new FileReader();
    let _this = this;
    reader.onload = (e: any) => {
      _this.fileBuffer = [... new Uint8Array(e.target.result)];
      _this.loadSaveFile();
    };

    // Read in the image file as a data URL.
    reader.readAsArrayBuffer(file);
  }

// Show name of character
  public loadSaveFile(charNum: number = 57392) {
    let c = 0;
    while (c < 32) {
      this.characters.push(new CharacterModel(this.fileBuffer, charNum + (c++ * 104)));
    }
  }

  loadFile(event: any) {
    try {
      this.validateFile(event.target.files[0]);
    } catch (e) {
      console.error(e);
    }
    event.target.value = null;
  }
}
