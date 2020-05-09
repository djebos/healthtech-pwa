import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RecommendationService} from '../service/recommendation.service';
import {Recommendation} from '../data/Recommendation';
import {MatDialog} from '@angular/material';
import {RecommendationPopupComponent} from '../recommendation-popup/recommendation-popup.component';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {
  analysisPeriodForm: FormGroup;
  recommendations: Recommendation[] = [];

  constructor(private recommendationService: RecommendationService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.analysisPeriodForm = new FormGroup(
      {analysisPeriod: new FormControl('Month')}
    );
  }

  analyseMeasurements() {
    this.recommendationService.getRecommendationsForPeriod(this.analysisPeriodForm.get('analysisPeriod').value)
      .subscribe(recommendations => this.recommendations = recommendations);
  }

  openRecommendationPopUp(recommendation: Recommendation) {
    this.dialog.open(RecommendationPopupComponent, {
      data: {
        reminder: recommendation.reminder,
        protocol: recommendation.protocol,
        severity: recommendation.severityLevel,
        description: recommendation.description
      }
    });
  }
}
