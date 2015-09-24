tableSerializer
=================================

	A small jQuery plugin to serialize html tables into an object. 
	
	
## Author

Mauro Caffaratto

## License

licensed under the MIT and GPL licenses


##Dependencies
This script needs jQuery to work.

##Current version: 0.1 

## Fast example:
	html
```html 
<table id="cool-table">
 	<thead>
		<tr>
			<th>Name</th>
			<th>Power</th>
			<th>Race</th>
		<tr>
	</thead>
	<tbody>
		<tr>
			<td>Goku</td>
			<td>100000</td>
			<td><span class="race-field">Saiyan</span></td>
		</tr>
		<tr>
			<td>Vegeta</td>
			<td>100000</td>
			<td><span class="race-field">Saiyan</span></td>
		</tr>
		<tr>
			<td>Krilin</td>
			<td>4000</td>
			<td><span class="race-field">Human</span></td>
		</tr>
	</tbody>
		
</table>

```

	javascript
```javascript
//Create a table serializer:

tableSerializer = TableSerializer($("#cool-table") );
	
//add a filter with a rule to manipulate data:
tableSerializer.addFilter('Race' , function($elem){ return $elem.find('span').html() });

//serialize :-)
var data = serializer.serialize();

```

serialize() push the data to an object wrapping arrays of data: one array for every row -including the table heading-.
