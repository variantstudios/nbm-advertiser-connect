$.ajax({
	type: 'GET',
	url: '/feed.json',
	data: {},
	async: false,
	dataType: 'json',
	beforeSend: function() {
		// Show image container
		$('#loader').show();
		$('#content').hide();
	},
	success: function(data) {
		//Do stuff with the JSON data
		pupData = [];
		pupData = data.value;
		var yearsArray = [];
		var selectedPub = 'Sign & Digital Graphics';
		var selectedDate;

		// Display the current pub
		$('.pub').text(selectedPub);

		// A dynamic funcation to return the specific query
		function queryString(num) {
			var queryString = window.location.search;
			var varArray = queryString.split('&');
			for (var i = 0; i < varArray.length; i++) {
				var param = varArray[i].split('=');
				if (num) {
					// if the num is passed then use it
					return param[num];
				} else {
					// if the num is not passed then just use the first one
					return param[1];
				}
			}
		}
		// Create a date value yyyy-mm for the current year and month
		var createDate = (function() {
			function addZ(n) {
				return n < 10 ? '0' + n : '' + n;
			}
			return function() {
				var d = new Date();
				return d.getFullYear() + '-' + addZ(d.getMonth() + 1);
			};
		})();

		// Update the variable for the selectedDate to either be the query value if exists and if not it'll be the current yyyy-mm
		if (queryString(1)) {
			selectedDate = queryString(1);
		} else {
			selectedDate = createDate();
		}
		function hotfixDate(val){
			return val + '-01T00:00:00Z';
		}

		var hotDate = hotfixDate(selectedDate);
		console.log(hotDate);
		$('.selectedDate').text(hotDate);

		// console.log(selectedDate);

		// var test = '2018-01-01T06:00:00Z';

		function cleanDate(val) {
			return val.slice(0, 7);
		}
		console.log(cleanDate(selectedDate));

		function convertDate(val) {
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var Month = monthNames[parseInt(val.substring(5, 7) - 1)];
			var Year = val.substring(0, 4)
			return  Month + ' ' + Year;
		}

		console.log(convertDate(selectedDate));

		// adding unique years to yearsArray
		$.each(pupData, function(index) {
			if (pupData[index].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication == selectedPub) {
				var year = pupData[index].aa_x002e_nbm_issuedate;
				if ($.inArray(year, yearsArray) == -1) {
					yearsArray.push(year);
				}
			}
		});

		//sorting the year
		yearsArray.sort();
		var $yearDropDown = $('#DropDown_Year');
		var $container = $('#details').find('ul');

		// append the years to select
		$.each(yearsArray, function(i) {
			$yearDropDown.append('<option value="' + yearsArray[i] + '">' + convertDate(yearsArray[i]) + '</option>');
		});

		$yearDropDown.change(function() {
			var selectedyear = this.value;
			// console.log('val ' + selectedyear);
			if (selectedyear !== '') {
			//filter based on  selected year.
				makesArray = jQuery.grep(pupData, function(product, i) {
					return product.aa_x002e_nbm_issuedate == selectedyear;
				});
				updateTable(makesArray);

				$('.selectedDate').text(convertDate(selectedyear) + ' ISSUE');
			}
		});


		function testing(val) {
			//console.log(val);
			var selectedyear = val;
			//filter based on  selected year.
			makesArray = jQuery.grep(pupData, function(product, i) {
				return product.aa_x002e_nbm_issuedate.slice(0, 7) == selectedyear;
			});
			//console.log(makesArray);
			updateTable(makesArray);
			$('.selectedDate').text(convertDate(selectedDate) + ' ISSUE');
		};

		//To update the table element with selected items
		updateTable = function (collection) {
			if (collection) {
				$container.empty();
				for (var i = 0; i < collection.length; i++) {
					if (collection[i].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication == selectedPub) {
						// $container.append(
						// 	'<tr><td><a href="' +
						// 	collection[i].a_92b77a4070bd4d1a82d9fa6ce38df2cc_x002e_websiteurl +
						// 	'" target="_blank">' +
						// 	collection[i].nbm_adindexname +
						// 	' - ' +
						// 	collection[i].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication + ' ' + convertDate(collection[i].aa_x002e_nbm_issuedate) +
						// 	'</a></td></tr> '
						// );
						$container.append( 
							'<li>' + '<a href="' + collection[i].a_92b77a4070bd4d1a82d9fa6ce38df2cc_x002e_websiteurl + '" target="_blank">' + collection[i].nbm_adindexname + '</a></li>'
						);
					}
				}
			}
		};

		//updateTable(pupData);
		//testing(hotDate);
		testing(selectedDate);

	},
	complete: function(data) {
		// Hide image container
		$('#loader').hide();
		$('#content').show();
		//jQuery("select#DropDown_Year option[value='2018-04-01T06:00:00Z']").attr("selected", "selected");
	}
});
