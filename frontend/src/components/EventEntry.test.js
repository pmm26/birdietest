import { render, screen } from '@testing-library/react';
import EventEntry from './EventEntry'

describe('EventEntry component', () => {
  test('renders valued capitalized', () => {

    const event = {
      "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "event_type": "fluid_intake_observation",
      "timestamp": "2016-08-29T09:12:33.001Z",
      "fluid": "caffeinated",
      "observed": false,
      "consumed_volume_ml": 230,
      "task_schedule_note": "Please assist me to brush my teeth",
      "task_definition_description": "Assist with oral hygiene",
      "note": "[redacted] is well. ",
      "medication_type": "SCHEDULED",
      "expected_dose_timestamp": "2016-08-28T09:12:33.001Z",
      "dose_size": "To be spread on infected area ",
      "alert_severity": "LOW",
      "severity": "MEDIUM",
      "visit_type": "bowel",
      "visit_count": 3,
      "volume_ml": 700
    }

    render(<EventEntry {...event} />);

    const eventType = screen.getByText('Fluid intake observation');
    expect(eventType).toBeInTheDocument();

    const date = screen.getByText('29th August 2016, 10:12:33 am');
    expect(date).toBeInTheDocument();

    const fluid = screen.getByText('Caffeinated');
    expect(fluid).toBeInTheDocument();

    const volumeConsumed = screen.getByText(230);
    expect(volumeConsumed).toBeInTheDocument();

    const medicationType = screen.getByText('SCHEDULED');
    expect(medicationType).toBeInTheDocument();

    const doseTimeStamp = screen.getByText('28th August 2016, 10:12:33 am');
    expect(doseTimeStamp).toBeInTheDocument();

    const doseSize = screen.getByText('To be spread on infected area');
    expect(doseSize).toBeInTheDocument();

    const alertSeverity = screen.getByText('LOW');
    expect(alertSeverity).toBeInTheDocument();
    
    const severity = screen.getByText('MEDIUM');
    expect(severity).toBeInTheDocument();

    const volume = screen.getByText(700);
    expect(volume).toBeInTheDocument();
    
    const visitType = screen.getByText('Bowel');
    expect(visitType).toBeInTheDocument();

    const visitCount = screen.getByText(3);
    expect(visitCount).toBeInTheDocument();

    const taskDescription = screen.getByText('Assist with oral hygiene');
    expect(taskDescription).toBeInTheDocument();

    const taskNote = screen.getByText('Please assist me to brush my teeth');
    expect(taskNote).toBeInTheDocument(); 

    const note = screen.getByText('[redacted] is well.');
    expect(note).toBeInTheDocument(); 
  });
})