function normalizeScore(impact, effort, risk) {
  var safeEffort = effort === 0 ? 1 : effort;
  return ((impact * 2) - risk) / safeEffort;
}

function updatePrioritySheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Matrix');
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6);
  var values = range.getValues();
  values.forEach(function(row, idx) {
    var score = normalizeScore(Number(row[2]), Number(row[3]), Number(row[4]));
    sheet.getRange(idx + 2, 7).setValue(score.toFixed(2));
  });
}
