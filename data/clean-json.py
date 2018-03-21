import json

movies = []
capitol = []
stats = []

with open('other/movies_IMDB.json', 'r') as jsonfile:
    movies = json.load(jsonfile)

for entry in movies:
    if  (entry["IMDB_Rating"]is not None) and \
        (entry["Rotten_Tomatoes_Rating"]is not None) and \
        (entry["Source"]is not None) and \
        (entry[ 'US_Gross' ] is not None) and \
        (entry[ 'US_Gross' ] != 0):
        capitol.append( { 
            "Title": entry["Title"],
            "US_Gross": entry["US_Gross"],
            "Worldwide_Gross": entry["Worldwide_Gross"],
            "US_DVD_Sales": entry["US_DVD_Sales"],
            "Production_Budget": entry["Production_Budget"],
        })
        stats.append( { 
            "Title": entry["Title"],
            "Release_Date": entry["Release_Date"],
            "MPAA_Rating": entry["MPAA_Rating"],
            "Running_Time_min": entry["Running_Time_min"],
            "Distributor": entry["Distributor"],
            "Source": entry["Source"],
            "Major_Genre": entry["Major_Genre"],
            "Creative_Type": entry["Creative_Type"],
            "Director": entry["Director"],
            "Rotten_Tomatoes_Rating": entry["Rotten_Tomatoes_Rating"],
            "IMDB_Rating": entry["IMDB_Rating"],
            "IMDB_Votes": entry["IMDB_Votes"]
        })
        if entry['Title'] == "Bananas":
            print( "hullos")

with open('capitol-movies-clean.json', 'w') as capitolclean:
    capitolclean.write(json.dumps(capitol, sort_keys=True, indent=4))

with open('stats-movies-clean.json', 'w') as statsclean:
    statsclean.write(json.dumps(stats, sort_keys=True, indent=4))


print("yay")