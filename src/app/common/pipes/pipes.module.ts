import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSecPipe } from './time-sec.pipe';
import { TableFilterPipe } from './table-filter.pipe';
import { FilterUsersPipe } from './filter-users.pipe';
import { FilterTypePipe } from './filter-type.pipe';
import { FilterTopicsPipe } from './filter-topics.pipe';
import { FilterTopicByStandardPipe } from './filter-topic-by-standard.pipe';
import { FilterTopicBySubjectPipe } from './filter-topic-by-subject.pipe';
import { FilterSubjectsPipe } from './filter-subjects.pipe';
import { FilterStatusPipe } from './filter-status.pipe';
import { FilterStandardsPipe } from './filter-standards.pipe';



@NgModule({
  declarations: [
    TimeSecPipe,
    TableFilterPipe,
    FilterUsersPipe,
    FilterTypePipe,
    FilterTopicsPipe,
    FilterTopicByStandardPipe,
    FilterTopicBySubjectPipe,
    FilterSubjectsPipe,
    FilterStatusPipe,
    FilterStandardsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeSecPipe,
    TableFilterPipe,
    FilterUsersPipe,
    FilterTypePipe,
    FilterTopicsPipe,
    FilterTopicByStandardPipe,
    FilterTopicBySubjectPipe,
    FilterSubjectsPipe,
    FilterStatusPipe,
    FilterStandardsPipe
  ]
})
export class PipesModule { }
