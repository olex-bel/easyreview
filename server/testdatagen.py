import json, random

items = 1000

out_file = open("./testdata/reviews-test.json", "w")

input_text = "Suspendisse potenti. Etiam gravida eget purus quis ultrices. Phasellus efficitur magna lobortis, consequat elit sit amet, elementum nulla. Quisque sagittis quis est sed rutrum. Mauris posuere nisl id est mattis, eget accumsan risus varius. Maecenas imperdiet volutpat mauris ut dapibus. Cras vitae ultrices tortor, ut pretium nisl. Vivamus scelerisque urna porta dolor pellentesque, vel rhoncus odio viverra. Maecenas facilisis turpis ex, in venenatis nisl fermentum id. Curabitur tempor metus turpis, commodo volutpat velit aliquam non. Vestibulum laoreet viverra quam at tincidunt. Nullam sollicitudin neque nec nulla auctor, faucibus dignissim dui tincidunt. Suspendisse aliquet nisl non dolor ullamcorper, quis fermentum ipsum luctus. Aliquam imperdiet metus at justo ornare faucibus vitae at sem. Proin sed nibh eget nisl lacinia aliquet"
words_list = input_text.split(' ')

for i in range(0, items):
    n_words = random.randint(1, len(words_list))
    items = {
        "productId": "P001",
        "email": "test1@test.com",
        "rating": random.randint(1, 5),
        "title": "Amazing product",
        "summary": ' '.join(words_list[0:n_words]),
        "nickname": "@test",
        "isRecommend": random.randint(1, 2) == 1,
        "created_at": {
            "$date": "2020-11-20T23:32:18Z"
        }
    }

    out_file.write(json.dumps(items, indent=4))

out_file.close()