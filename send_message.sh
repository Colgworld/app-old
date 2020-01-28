
USER=${1:-"brett"}
ID="00000000000000000000000000000000000000000000"
MESSAGE=""
THREAD_ID=$(uuidgen)

X=0
ALL_NON_RANDOM_WORDS=/usr/share/dict/words

# total number of non-random words available
non_random_words=`cat $ALL_NON_RANDOM_WORDS | wc -l`

# while loop to generate random words
# number of random generated words depends on supplied argument
while [ "$X" -lt "$1" ]
do
random_number=`od -N3 -An -i /dev/urandom |awk -v r="$non_random_words" '{printf "%i\n", f + r * $1 / 16777216}'`
q=$(echo $random_number"q;d" | sed 's/ 0//g')
# q=$(echo "$q" | sed 's/ 0//g')
word=$(sed "$q" $ALL_NON_RANDOM_WORDS)
MESSAGE="$word $MESSAGE"
  let "X = X + 1"
done


case $USER in
    "brett" )
        ID="00000000000000000000000000000000000000000000"
        ;;
    "homeowner" )
        ID="JW9CIIYquRbSldVP-MS_lZ6hyoABRzEA8jNAJusw0XQ="
        MESSAGE="Hey brett its homeowner"
        ;;
    "susan" )
        ID="22222222222222222222222222222222222222222222"
        MESSAGE="Lmk about the change order"
        ;;
    "mike" )
        ID="55555555555555555555555555555555555555555555"
        MESSAGE="What about the stuff?"
        ;;
esac

echo "sending message $MESSAGE as $USER"
curl -s -X POST http://localhost:8080/api/message -d "{\"text\":\"$MESSAGE\", \"thread_id\":\"$THREAD_ID\", \"project_id\":12, \"is_new\":true, \"to_user_ids\":[1,2]}" -H "X-Blue-Cheese-Fist: $ID" | jq .
