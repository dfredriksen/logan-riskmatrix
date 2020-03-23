# logan-riskmatrix
A risk matrix heatmap for Google Charts that calculates the total number of risks in each category based on likelihood/impact

Copyright 2020 Nathaniel Logan.
Author: Daniel Fredriksen & Nathaniel Logan

## Google Charts

For information on how to use Google Charts API, visit the (Google Charts documentation)[https://developers.google.com/chart/interactive/docs/quick_start].

## Usage

The matrix takes 

## Options

The second parameter of the `draw` function is an object whose properties will override some of the default options, according to the Google Charts design spec. The following options that can be specified are shown below with their defaults:

    categories = 5
    xAxisLabel = 'Impact / Severity / Consequence'
    yAxisLabel = 'Likelihood / Probability / Frequency'
    categoryLabels = ['Negligible', 'Low', 'Moderate', 'High', 'Critical']
    colors = ['#6aa84f', '#ffff00', '#ff9900', '#ff0000', '#000000']
    darkFontIndex = [1]
    fontColorLight = '#ffffff'
    fontColorDark = '#000000'

### categories

This setting determines how many categories of risk there are. It will generate a matrix of `categories` rows and `categories` columns. The default is `5` which will create a 25 cell matrix.

### xAxisLabel

The text which will be displayed for the x-axis label. If this option is specified, it will override the value taken from the 0th column title.

### yAxisLabel

The text which will be displayed for the y-axis label. If this option is specified, it will override the value taken from the 1st column title.

### categoryLabels

Takes an array of strings which represent the labels of the categories of each column. Must have as many elements as there are `categories`. If there is a mismatch between `categories` and `categoryLabels.length` then all size-dependent properties will reset to their defaults (`categories`, `categoryLabels`, `darkFontIndex` and `colors`).

### colors
Takes an array of strings which represent the css property to use for the colors of the cells. The number of colors should match the number of `categories`. If there is a mismatch between `categories` and `colors.length` then all size-dependent properties will reset to their defaults (`categories`, `categoryLabels`, `darkFontIndex` and `colors`). The colors for each cell will be determined based on a set of conditions to simulate a gradient, with the 0th index representing the bottom left of the matrix and the largest index representing the top right.

### darkFontIndex

An array of integers which represent the matching color indexes where the darkFont color should be applied. If the `darkFontIndex` array contains a value that exceeds the available indexes in `colors` then all size-dependent properties will reset to their defaults (`categories`, `categoryLabels`, `darkFontIndex` and `colors`).

### fontColorLight

A string representing the css value to use for the text color of the cells which do not display a color index matching any of the values specified in `darkFontIndex`

### fontColorDark

A string representing the css value to use for the text color of the cells which display a color index matching any of the values specified in `darkFontIndex`

