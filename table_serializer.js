/**
*Serializes a table into an array of arrays, where each row equals to a table row (and 0 being the heading row).
*
*Usage:
*    var serializer = TableSerializer($("#myCoolTable"));
*
*    var tableData = serializer.serialize();
*
*
*You can filter the results, adding filter callbacks that will be applied to every value parsed when a index key is matched. In the example,
*when the serializer finds the 'external-link' value, it returns the html of the anchor instead of all the value:
*
*    var serializer = TableSerializer($("#myTrickyTable"));
*
*    serializer.addFilter( 'external-link' , function( $td){ return $td.find('a').html()  } );
*
*    var tableData = serializer.serialize();
*
*By default, the index -> value schema for each row is read from the table heading. That schema is applied when using the addFilter function.
*
*@param $table: a jQuery object pointing to html table.
*@param schema: array with field names. array with a length different from the table row length will cause undesired behaviour.
*/
var TableSerializer = function( $table ,  schema ){

    var table = $table;


    /**
    *Internal object to handle row serialization.
    */
    var Filter = function( schema ){
        /**
        *conditions to apply when filtering. Each key is given a Function.
        */
        var conditions = [];

        /**
        *Reads the schema from theading if no one is provided.
        */
        var gambleSchema = function(){
            schema = [];

            table.find("thead th").each(function( index, value ){

                schema.push($(this).html(  ) );
            });

            return schema;
        };

        //set the schema:
        if(typeof schema == 'undefined')
            var schema = gambleSchema();
        else
            var schema = schema;



        /**adds a condition to apply when sending result.
        *@index schema key, usually the name of a field in the table heading
        *@output function to map the result to a desired value
        */
        var addCondition = function( index , output ){

            conditions[index] = output;
        }

        /**
        *Empty the conditions array, so no extra filter will be applied beyond this call.
        */
        var resetConditions = function(){

            conditions = [];
        }

        /**
        *return a function to properly filter a row, using the schema and the conditions.
        */
        var getFilter = function(){

            return function($element , index){
                var result = [];

                var key  = schema[index];

                if (key in conditions)
                    return  conditions[key]($element);
                else
                    return $element.html();


                return result;
            }
        }

        //object returned when closure is invoked:
        return {getFilter : getFilter  , addCondition : addCondition , resetConditions : resetConditions  };
    }

    var filter = Filter(schema);

    /**
    *delegates to filer.addCondition()
    */
    var addFilter = function(index , output ){

        filter.addCondition(index , output);
    }

    /**
    *Push heading values into an array
    */
    var processHeading = function(){
        var result = [];

        table.find("thead th").each(function( index, value ){

            result.push($(this).html(  ) );
        });

        return result;

    }

    var toObject =function (arr) {
          var rv = {};
          for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
          return rv;
      }
    /**
    *returns an array, when each value is an array with every value of a table row.
    */
    var serialize = function(){

        var result = [] ;
        var aux =[];
        var refine = filter.getFilter();

         result.push(processHeading() );

        //heding processed

        //now processing body
        table.find("tbody tr").each(function(){

            aux = [];

            $(this).find('td').each(function( index ){

                aux.push(refine( $(this), index)  );
            });

            result.push(aux);
        });


        return toObject(result);

    }

    //object returned from closure invocation
    return {serialize : serialize , addFilter : addFilter };

}
