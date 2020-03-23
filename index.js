var logan = {};

logan.RiskMatrix = function(container) {
  this.container = container
}

logan.RiskMatrix.prototype.draw = function(data, options) {
  var html = []
  var tally = {}
  var categoriesDefault = 5
  var xAxisLabelDefault = 'Impact / Severity / Consequence'
  var yAxisLabelDefault = 'Likelihood / Probability / Frequency'
  var categoryLabelsDefault = ['Negligible', 'Low', 'Moderate', 'High', 'Critical']
  var colorsDefault = ['#6aa84f', '#ffff00', '#ff9900', '#ff0000', '#000000']
  var darkFontIndexDefault = [1]
  var categories = options.categories || categoriesDefault;
  var categoryLabels = options.categoryLabels || categoryLabelsDefault
  var colors = options.colors || colorsDefault
  var fontColorLight = options.fontColorLight || '#ffffff'
  var fontColorDark = options.fontColorDark || '#000000'
  var darkFontIndex = options.darkFontIndex || darkFontIndexDefault
  var xAxisLabel =  options.xAxisLabel || data.getColumnLabel(0) || xAxisLabelDefault
  var yAxisLabel = options.yAxisLabel ||  data.getColumnLabel(1) || yAxisLabelDefault

  if(categories !== categoryLabels.length || colors.length !== categories || Math.max(darkFontIndex) > colors.length-1) {
    categories = categoriesDefault
    categoryLabels = categoryLabelsDefault
    colors = colorsDefault
    darkFontIndex = darkFontIndexDefault
    console.log('Error, one or more of the size based options is invalid. Resetting to defaults')
  }

  for(var row = 0; row < data.getNumberOfRows(); row++) {
    var likelihood = data.getValue(row, 0)
    var impact = data.getValue(row, 1)
    var score = likelihood * impact
    if(typeof tally[score] === 'undefined')
      tally[score] = 0
    tally[score]++
  }

  html.push(`<style>

    table.logan-riskmatrix {
      font-family: "Open Sans";
      height: 100%;
      width: 100%;
      border: solid 1px gray;
      border-collapse: collapse;
    }

    .logan-riskmatrix th, .logan-riskmatrix td {
      border: solid 1px gray;
    }

    .logan-riskmatrix .logan-riskmatrix-cell {
      text-align: center;
      font-weight: bold;
      border: solid 1px black;
    }

    .logan-riskmatrix-header th {
      height: 10px;
    }
    .logan-riskmatrix-y-label {
      max-width: 20px;
      overflow: visible;
      white-space: nowrap;
      vertical-align: middle;
    }

    .logan-riskmatrix-y-label-text {
      transform: rotate(-90deg);
      display: block;
      margin-top: 200px;
    }
    .logan-riskmatrix-x-label {
      text-align:center;
      height: 20px;
    }
  </style>`)
  html.push('<table class="logan-riskmatrix">')
  html.push('<tr class="logan-riskmatrix-header">')
  html.push('<th>&nbsp;</th>')
  categoryLabels.forEach(label => {
    html.push(`<th style="width: ${100/categories}%">${label}</th>`)
  })
  html.push('</tr>')
  for( var row = 0; row < categories; row++) {
    html.push('<tr>')
    if(row === 0)
      html.push(`<td rowspan="${categories}" class="logan-riskmatrix-y-label"><span class="logan-riskmatrix-y-label-text">${xAxisLabel}</span></td>`)

    for(var col = 0; col < categories; col++) {
      var cellScore = (col+1)*(categories - row)
      var colorIndex = 0
      colorIndex = col
      if(col === (categories-1) && row > 0)
        colorIndex = col-row

      if(row > 0 && col < (categories-1)) {
        indexes = (colors.length) - row
        console.log(colors[3])
        colorIndex = Math.round(indexes * (col/(categories -1)) - 0.1)
        if(colorIndex > indexes-1)
          colorIndex = indexes-1
      }

      if(col === (categories-1) && row === 0)
        colorIndex = colors.length-1

      var cellValue = tally[cellScore] || '&nbsp;'
      html.push(`<td class="logan-riskmatrix-color-${colorIndex} logan-riskmatrix-cell" style="width: ${100/categories}%; background-color: ${colors[colorIndex]}; color: ${darkFontIndex.includes(colorIndex) ? fontColorDark : fontColorLight};">${cellValue}</td>`)
    }
    html.push('</tr>')
  }  

  html.push('<tr>')
  html.push('<td>&nbsp;</td>')
  html.push(`<td colspan="${categories}" class="logan-riskmatrix-x-label"><span class="logan-riskmatrix-x-label-text">${yAxisLabel}<span></td>`)
  html.push('</tr>')
  html.push('</table>')
  this.container.innerHTML = html.join('');
}