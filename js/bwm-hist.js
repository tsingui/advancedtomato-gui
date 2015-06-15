
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var snames = [' KB', ' MB', ' GB'];
var scale = 2;

function rescale(n, z)
{
	if ((z) && (n == 0)) return '-';
	return (((z) && (n > 0)) ? '+' : '') + comma((n / ((scale == 2) ?  1048576 : ((scale == 1) ? 1024 : 1))).toFixed(2)) + snames[scale];
}

function changeScale(e)
{
	scale = e.value * 1;
	redraw();
	save();
}

function makeRow(rclass, rtitle, dl, ul, total)
{
	return '<tr class="' + rclass + '">' +
		'<td class="rtitle">' + rtitle + '</td>' +
		'<td class="dl">' + dl + '</td>' +
		'<td class="ul">' + ul + '</td>' +
		'<td class="total">' + total + '</td>' +
		'</tr>';
}

function makeRowIP(rclass, rtitle, ip, dl, ul, total)
{
	return '<tr class="' + rclass + '">' +
		'<td class="rtitle">' + rtitle + '</td>' +
		'<td class="ip">' + ip + '</td>' +
		'<td class="dl">' + dl + '</td>' +
		'<td class="ul">' + ul + '</td>' +
		'<td class="total">' + total + '</td>' +
		'</tr>';
}

function cmpHist(a, b)
{
	a = parseInt(a[0], 0);
	b = parseInt(b[0], 0);
	if (a < b) return 1;
	if (a > b) return -1;
	return 0;
}

function checkRstats()
{
	if (nvram.rstats_enable != '1') {
		
		W('<div class="alert alert-warning">Bandwidth monitoring disabled.</b> <a href="admin-bwm.asp">Enable &raquo;</a></div>');
		$(function() { E('rstats').style.display = 'none'; });
		
	} else {
		
		W('<div class="alert alert-info" style="display:none" id="rbusy">The rstats program is not responding or is busy. Try reloading after a few seconds.</div>');
		
	}
}

function checkCstats()
{
	if (nvram.cstats_enable != '1') {
		
		W('<div class="alert alert-info">IP Traffic monitoring disabled.</b> <a href="admin-iptraffic.asp">Enable &raquo;</a></div>');
		$(function() { E('cstats').style.display = 'none'; });
		
	} else if (cstats_busy) {
		
		W('<div class="alert alert-info">The cstats program is not responding or is busy. Try reloading after a few seconds.</div>');
		
	}
}

/*

0	yyyy-mm-dd
1	mm-dd-yy
2	mmm, dd, yyyy
3	dd.mm.yyyy

*/

var dateFormat = -1;

function ymText(yr, mo)
{
	switch (dateFormat) {
		case 1:
			return (mo + 1).pad(2) + '-' + yr;
		case 2:
			return months[mo] + ' ' + yr;
		case 3:
			return (mo + 1).pad(2) + '.' + yr;
	}
	return yr + '-' + (mo + 1).pad(2);
}

function ymdText(yr, mo, da)
{
	switch (dateFormat) {
		case 1:
			return (mo + 1) + '-' + da.pad(2) + '-' + yr;
		case 2:
			return months[mo] + ' ' + da + ', ' + yr;
		case 3:
			return da.pad(2) + '.' + (mo + 1).pad(2) + '.' + yr;
	}
	return yr + '-' + (mo + 1).pad(2) + '-' + da.pad(2);
}

function changeDate(e, c)
{
	dateFormat = e.value * 1;
	cookie.set(c, e.value, 31);
	redraw();
}

function initDate(c)
{
	dateFormat = fixInt(cookie.get(c), 0, 3, 0);
	E('dafm').value = dateFormat;
}
