const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.put('/put/:id', (req, res) => {
  const updateTimesheets = req.body;
  const timesheetsId = req.params.id;
  const foundTimesheet = timeSheets.find((element) => element.id === timesheetsId);
  if (!foundTimesheet) {
    res.status(404).json({
      success: false,
      msg: 'There is no Timesheet with this id',
    });
    return;
  }
  if (updateTimesheets.startDate) {
    foundTimesheet.startDate = updateTimesheets.startDate;
  }
  if (updateTimesheets.endDate) {
    foundTimesheet.endDate = updateTimesheets.endDate;
  }
  if (updateTimesheets.taskName) {
    foundTimesheet.taskName = updateTimesheets.taskName;
  }
  if (updateTimesheets.description) {
    foundTimesheet.description = updateTimesheets.description;
  }
  if (updateTimesheets.projectName) {
    foundTimesheet.projectName = updateTimesheets.projectName;
  }

  fs.writeFile(
    './src/data/time-sheets.json',
    JSON.stringify(timeSheets, null, 2),
    (err) => {
      if (err) {
        res.status(400).json({
          response: 'Error',
          msg: 'Timesheet id not found',
        });
      } else {
        res.status(202).json({
          success: true,
          msg: 'Timesheet modified successfully',
          data: foundTimesheet,
        });
      }
    },
  );
});

router.delete('/delete/:id', (req, res) => {
    const timesheetsId = req.params.id;
    const deleteTimesheet = timeSheets.find((element) => element.id === timesheetsId);
    if (!deleteTimesheet) {
        res.status(404).json({
          success: false,
          msg: 'There is no Timesheet with this id',
        });
        return;
      }

      timeSheets.splice(timeSheets.indexOf(deleteTimesheet), 1);

      res.status(200).json({
        timeSheets,
      });
      fs.writeFile(
        './src/data/time-sheets.json',
        JSON.stringify(timeSheets, null, 2),
        (err) => {
          if (err) {
            res.status(400).json({
              response: 'Error',
              msg: 'Timesheet id not found',
            });
          } else {
            res.status(202).json({
              success: true,
              msg: 'Timesheet modified successfully',
              data: foundTimesheet,
            });
          }
        },
      );
});
module.exports = router;