import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  copyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

   
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    document.body.appendChild(textArea);
    textArea.select();

    try {
      // Metni panoya kopyalayın
      document.execCommand('copy');
    } catch (err) {
      console.error('Metni kopyalama başarısız:', err);
    }

    document.body.removeChild(textArea);
  }
}
