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

		// adding unique years to yearsArray
		$.each(pupData, function(index) {
            if(pupData[index].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication == selectedPub){
                var year = pupData[index].aa_x002e_nbm_issuedescription;
                if ($.inArray(year, yearsArray) == -1) {
                    yearsArray.push(year);
                }
            }
			
		});

		//sorting the year
		yearsArray.sort();
		var $yearDropDown = $('#DropDown_Year');
		var $container = $('#details').find('tbody');

		// append the years to select
		$.each(yearsArray, function(i) {
			$yearDropDown.append('<option value="' + yearsArray[i] + '">' + yearsArray[i] + '</option>');
		});

		$yearDropDown.change(function() {
			var selectedyear = this.value;
			//filter based on  selected year.
			makesArray = jQuery.grep(pupData, function(product, i) {
				return product.aa_x002e_nbm_issuedescription == selectedyear;
			});
			updateTable(makesArray);
		});

		//To update the table element with selected items
		updateTable = function(collection) {
			$container.empty();
			for (var i = 0; i < collection.length; i++) {
                if(collection[i].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication == selectedPub){
                    $container.append(
                        '<tr><td><a href="' +
                        collection[i].a_92b77a4070bd4d1a82d9fa6ce38df2cc_x002e_websiteurl + '" target="_blank">' +
                            collection[i].nbm_adindexname + ' - ' + collection[i].a_006a078ff371e111b2141cc1def177b7_x002e_nbm_publication +
                            '</a></td></tr> '
                    );
                }
			}
		};

		updateTable(pupData);
	},
	complete: function(data) {
		// Hide image container
		$('#loader').hide();
		$('#content').show();
	}
});
