import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DigPluginFormComponent} from "../dig-plugin-form/dig-plugin-form.component";
import {DigPluginTemplateComponent} from "../dig-plugin-template/dig-plugin-template.component";
import {DigService} from "../dig.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'dig-plugin',
  templateUrl: './dig-plugin.component.html',
  styleUrls: ['./dig-plugin.component.scss']
})
export class DigPluginComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() uid!: string;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Input() formGroup!: FormGroup;

  @ViewChild(DigPluginFormComponent) formComponent!: DigPluginFormComponent;
  @ViewChild(DigPluginTemplateComponent) templateComponent!: DigPluginTemplateComponent;

  private sub!: Subscription;

  constructor(private digService: DigService) { }

  ngOnInit(): void {
  }

  getForm() {
    return this.formComponent?.formGroup;
  }

  getData(): Observable<any> {
    return this.digService.getData(this.uid);
  }

  ngAfterViewInit(): void {
    if (this.formGroup) {
      this.digService.setForm(this.uid, this.formGroup);
    }
    this.sub = this.digService.getData(this.uid).subscribe(value => {
      this.data.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
