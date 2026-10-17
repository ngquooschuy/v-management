import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { interval, of, Observable } from 'rxjs';

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

  // 10. SECURITY: Insecure HTTP URL
  private readonly API_ENDPOINT = 'http://api.internal.corp:8080/v1/auth';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
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
    this.triggerFloatingPromise();
    this.nestedSubscriptions();
  }

  // 6. BUG / CRASH: Potential NullPointerException / Unhandled null
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
      return 'Active';
    } else if (status === 1) {
      // Dead code: Condition is identical to previous branch
      return 'Pending';
    }
    return 'Unknown';
  }

  // 9. ANTI-PATTERN: Direct DOM manipulation in Angular
  changeColor() {
    console.time('changeColor');
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

  // 10. SECURITY (ANGULAR): Bypassing security trust html (Critical Security Hotspot)
  renderUnsafeHtml(rawUserContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(rawUserContent);
  }

  // 11. SECURITY: Weak / Insecure Cryptography for sensitive tokens
  generateSessionToken(): string {
    return 'token_' + Math.random().toString(36).substring(2);
  }

  // 12. SECURITY: Open Redirect vulnerability
  redirectToUrl(targetUrl: string): void {
    window.location.href = targetUrl;
  }

  // 13. CODE SMELL: Empty catch block (swallowing error completely)
  parseUserData(rawJson: string): any {
    try {
      return JSON.parse(rawJson);
    } catch (e) {
      // Swallowed exception without logging or re-throwing
    }
  }

  // 14. CODE SMELL / ANTI-PATTERN: Nested RxJS subscriptions (Callback hell in reactive code)
  nestedSubscriptions(): void {
    of('userId_123').subscribe((id) => {
      of({ id, name: 'John' }).subscribe((user) => {
        of(['admin', 'editor']).subscribe((roles) => {
          console.log('Loaded user and roles:', user, roles);
        });
      });
    });
  }

  // 15. BUG: Floating Promise (Promise called without await or .catch)
  async triggerFloatingPromise(): Promise<void> {
    fetch('/api/tracking-log'); // Unhandled promise rejection risk
  }

  // 16. CODE SMELL: Async function with no await
  async fetchConfig(): Promise<string> {
    return 'STATIC_CONFIG';
  }

  // 17. BUG: Comparing with NaN & Self-assignment
  validateNumber(num: number): boolean {
    this.title = this.title; // Useless self-assignment
    if (num === NaN) {
      // Bug: num === NaN is always false in JavaScript!
      return false;
    }
    return true;
  }

  // 18. BUG: Switch statement fall-through (missing break)
  getPriority(level: string): number {
    let priority = 0;
    switch (level) {
      case 'HIGH':
        priority = 10;
      // Missing break: falls through to next case!
      case 'MEDIUM':
        priority = 5;
        break;
      default:
        priority = 1;
    }
    return priority;
  }

  // 19. CODE SMELL: High Cognitive Complexity (Deeply nested conditions & loops)
  calculateDiscount(userType: string, cartTotal: number, isVip: boolean, items: any[]): number {
    let discount = 0;
    if (cartTotal > 100) {
      if (userType === 'MEMBER') {
        if (isVip) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].isPromo) {
              if (items[i].quantity > 5) {
                discount += 25;
              } else {
                discount += 15;
              }
            }
          }
        } else {
          discount += 10;
        }
      } else {
        discount += 5;
      }
    }
    return discount;
  }

  // 20. CODE SMELL: Too many function parameters (> 7 parameters)
  createUser(
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    phone: string,
    address: string,
    country: string,
    zipCode: string
  ): void {
    console.log(firstName, lastName, email, age, phone, address, country, zipCode);
  }

  // 21. PERFORMANCE: Heavy computation inside template getter
  get heavyComputation(): number {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  }
}
