import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ],
    providers: [LoggingService]
})
export class SharedModule {

}