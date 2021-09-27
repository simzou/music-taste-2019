Options
- [ ] Update the 2019_1.csv files in place, preserve track ids
    - track ids / keys use 3ish counting mechanisms
    - unique key on artist + song, or the spotify hash might be enough though.
        - actually yea, the track id is redundant considering there's another unique identifier
            - some of those fields are blank though and spotify isn't guaranteed to have everything
    - makes it so the only change they even have to accept is to replace the data file if nothing else
- [ ] Scrape all the data over again, new track ids
    - spotify's api is free and unlimited, seemingly
    - billboard library just scrapes their website, so should be fine
- [ ] Use sqlite database instead of csvs
    - I feel like adding future data will be easier with this than appending to csvs
    - orthogonal to other decision but related in that we have a choice of importing existing csvs or scraping everything new
- [/] another idea, replace all track ids with a consistent scheme
    - how do you update the chart_data table though? 
    - nvm
- original pipeline inferred from the files was scrape everything, the delete duplicate rows, then...how would the charts table be constructed?
- maybe just start writing pseudocode for the new data to add and see what problems come up
- [ ] update data
    - [ ] get spotify api auth
    - [ ] scrape (or via api if it exists) billboard top 5
    - [ ] determine schema / id system and insert new rows into csv
    - [ ] move into sqlite db maybe (stretch goal)

```
let tracks, chart_data be the two tables
decide on track_id scheme

start at most_recent_2019_date
for every week from 2019 to present
    get billboard chart data
        artist, song, position
        if track not in existing db
            search spotify api for track, get data
                artist_url, song_url
                insert into tracks table
                write to new csv
        lookup track_id
            insert week, trackid, position into chart_data
            write to new csv
for csv output:
    append the new csvs to old ones
for json output:
    update graphic.js to use sqlite driver and do the join
```

Based on algorithm above there doesn't seem to be a compelling reason to scrape everything over again so long as we just import the csvs to a db to make up lookups a little easier
    inconsistent track ids are annoying but not a dealbreaker

in 2021 update branch, just include the updated csvs
    in separate branch, have the sqlite database and updated javascript code to use it