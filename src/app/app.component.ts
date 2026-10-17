import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  color = '';

  // 1. SECURITY: Hardcoded secret / API Key
  private readonly AWS_SECRET_KEY = 'AKIAIOSFODNN7EXAMPLEKEY1234567890';
  private readonly DB_PASSWORD = 'SuperSecretAdminPassword123!';

  // 2. CODE SMELL: Unused variable & any type
  private unusedData: any;

  nt(): void {
    // 3. CODE SMELL: Debugger statement left behind
    debugger;

    // 4. MEMORY LEAK: Subscribing without unsubscribe/takeUntil/ngOnDestroy
    interval(1000).subscribe((val) => {
      console.log('Ticking without unsubscribe:', val);
    });

    // 5. MEMORY LEAK: Event listener without cleanup
    window.addEventListener('resize', () => {
      console.log('Window resized');
    });

    this.processData(null);
  }

  // 6. BUG / CRASH: Potential NullPointerException / Unhandled nullll
  processData(user: any) {
    // Unsafe access, will throw TypeError at runtime
    const upperName = user.name.toUpperCase();
    return upperName;
  }

  // 7. SECURITY: XSS vulnerability using eval
  executeScript(userInput: string) {
    eval(userInput);
  }

  // 8. CODE SMELL & BUG: Duplicate conditions / dead code
  checkStatus(status: number): string {
    if (status === 1) {
      return 'Activeeeee';
    } else if (status === 1) {
      // Dead code: Condition is identical to previous branch
      return 'Pending';
    }
    return 'Unknown';
  }

  changeColor() {
    console.time('changeColor');
    // 9. ANTI-PATTERN: Direct DOM manipulation in Angular
    const button = document.querySelector('button');
    button!.style.backgroundColor = 'red';
    console.timeEnd('changeColor');
  }

  changeColorTheRightWay() {
    console.time('changeColorTheRightWay');
    this.color = 'red';
    console.timeEnd('changeColorTheRightWay');
    console.log('login ok');
  }
}
