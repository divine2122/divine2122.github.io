#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  9 19:47:33 2020

@author: divineo
"""

#imports lyrics and sets it in dataframe
import requests
page=requests.get('https://genius.com/Jamila-woods-eartha-lyrics')
from bs4 import BeautifulSoup
soup=BeautifulSoup(page.content, 'html.parser')
souptext=soup.text
soup.select('body')
soup1=soup.select('body routable-page')
soup.select('body routable-page')
soup.p
soup1=soup.p
soup2='soup2'
soup1.text
list(soup1.children)
soup1.list
soup.find_all('p')
soup1.find_all('br')
soup.find_all('p')
soup.find_all('br')
soup1.content
print(soup1.content)
soup1.text
soup1.children
soup1.content
soup2=soup1.text.replace("\n", "")
soup2=soup1.text.replace("\n", ",")
soup2=soup1.text.replace("\n", ", ")
soup2.split(", ")
import pandas as pd
soup2=soup2.split(", ")
#removes empty lines from soup3
soup2 = [string for string in soup2 if string != ""]


#cleaning up comma separated column list
soup3=soup1.text.replace("\n", "")
soup3=soup1.text.replace("\n", ", ")
soup3.split(", ")
soup3=soup3.split(", ")
soup3=soup1.text.replace(" ", ", ")
soup3.split("/n")



#makes 2nd column in lyric into comma separated list
soup3=soup1.text.replace("\n", ", ")
soup3=soup3.split(", ")
#removes empty lines from soup3
soup3 = [string for string in soup3 if string != ""]



soup4 = [element for item in soup3 for element in item.split(',')]
[', ' if x==' ' else x for x in soup3]
soup4 = [x.replace(" ", ",") for x in soup3] 
lyric=pd.DataFrame({
"lyrics":soup2,
"lyrics2":soup4,
})



#separates lyrics2 by commas and turns cell into list
lyric['lyrics2'] = [x.strip('()').split(',') for x in lyric['lyrics2']]



#imports g2p and defines function for pheoneme output
from g2p_en import G2p
g2p = G2p()
    

#asks for and definied user input. 
print('Enter word')
input=input()
out=g2p(input)
inputvowels = [sound for sound in out if sound not in {'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'SH', 'DH', 'HH', '?', 'NG', 'DH', 'TH', ' ', '\''}]
print("Your word sound: "+inputvowels[-1])


#runs thru each element of list in each index: Sets variable for g2p output, sets another variable that removes all consonants and others characters,, points to final vowel sound in list 
g2poutput=[]

for line in lyric.lyrics2:
    for word in line:
#        print(word)
        out=g2p(word)
#        print(out)
        vowels = [sound for sound in out if sound not in {'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'SH', 'DH', 'HH', '?', 'NG', 'DH', 'TH', ' ', '\''}]
#        print(vowels)
#        print(vowels[-1])
        if vowels[-1]==inputvowels[-1]:
#            print(word)
            g2poutput.append(word)
    
print(g2poutput)









#Notes
#currently problem bc it makes both columns strings.
#lyricstringbroke=lyric.astype("string")   This line no longer works bc df has a column w list data. have to point to specific string column like in line below. error message:stringarray requires a sequence of strings 
#lyricstring=lyric.lyrics.astype("string")
#s2 = lyricstring

"""
elf-health-elk-help-welt-hells-belch (all of these share voiceless final consonants)


when-end-hem-hen-ginseng -(final nasal consonants)



https://englishtipsblog.wordpress.com/consonant-sounds-2/
https://www.londonschool.com/blog/phonetic-alphabet/
"""













