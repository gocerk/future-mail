<main>
    <div class="flex justify-center">
        <div>
            <label for="letterArea" class="form-label text-white mb-2">Future Mail</label>

            <!-- <input type="text" name="date"> -->

            <input 
            class="
            block w-full mt-2 mb-2 bg-black border-solid border rounded 
            text-white
            focus:border-blue-600 focus:outline-none
            " 
            id="email"
            type="email"
            placeholder="Email">

            <textarea
              class="
                form-control block w-full px-3 text-base font-normal text-white
                bg-black bg-clip-padding border border-solid border-gray-300 rounded
                transition ease-in-out m-0 focus:border-blue-600 focus:outline-none
              "
              id="letterArea"
              rows="3"
              placeholder="Your mail for your future"
            ></textarea>

            <input type="text" name="datepicker">

            <button id="btn" class="bg-lime-600 p-0.5 w-full cursor-pointer mt-2 mr-0 h-1/5 text-center text-white">
                Send your mail for the future!
            </button>
        </div>
    </div>
</main>

<script>
    import { onMount } from "svelte";
    // import Datepicker from '../../node_modules/vanillajs-datepicker/js/Datepicker';
    import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';

    let btn;
    let letterArea;
    let emailArea;

    let deliveryDate;
    let writingDate;
    let docId;

    onMount(() => {
        btn = document.getElementById("btn");
        letterArea = document.getElementById("letterArea");
        emailArea = document.getElementById('email');
        var dateInput = document.querySelector('input[name="date"]');
        console.log(dateInput);
        new Datepicker(dateInput);

        btn.addEventListener("click", async () => {
            await getMongoDbDocumentId(letterArea.value, email.value, new Date('2022-05-16'));
            console.log(deliveryDate, writingDate, docId);
            await addQueue(docId);
        });
    });

    async function getMongoDbDocumentId(msg, email, deliveryDate) {
        const response = await fetch('http://localhost:3001/addDb/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msg: msg,
                email: email, 
                deliveryDate: deliveryDate
            })
        });

        const data = await response.json();
        // console.log(data.deliveryDate);
        deliveryDate = data.deliveryDate;
        writingDate = data.writingDate;
        docId = data._id;
    }

    async function addQueue(docId) {
        try {
            const response = await fetch('http://localhost:3001/queue/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deliveryDate: deliveryDate,
                    writingDate: writingDate, 
                    msgId: docId
                })
            });

            const data = await response.json();
            return { status: 'success', message: data }
        } catch (e) {
            return { status: 'error', message: e }
        }
    }
</script>