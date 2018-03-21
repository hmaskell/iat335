import json
import argparse

parser = argparse.ArgumentParser(description='Clean JSON file.')
parser.add_argument('json_file', type=str , help='JSON file')
parser.add_argument( 'out_file', type=str, help="Cleaned JSON file")
parser.add_argument('columns', type=str, nargs='+', help='required columns')

args = parser.parse_args()

initial_json = []

with open( args.json_file, 'r' ) as jsonfile:
    initial_json = json.load( jsonfile )

filtered_json = []
for entry in initial_json:
    passed = True
    for column in args.columns:
        if entry[ column ] is None  or entry[ column ] == '' or entry[ column ] == 0:
            passed = False
    if passed:
        filtered_json.append( entry )

with open( args.out_file, 'w' ) as outfile:
    outfile.write( json.dumps( filtered_json, sort_keys=True, indent=4 ) )

print( "Saved {0} entries".format( len( filtered_json ) ) )
