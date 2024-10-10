// load data for the let's discuss section

const loadAllData = async (query) => {

    //show spinner
    document.getElementById('loading-container').style.display = 'block';

    //fetch data
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${query}`);
    const data = await response.json();
    const finalData = data.posts;
    //console.log(data);
    //console.log(data.posts[0]);
     

    // NOT FOUND if there is no data match in the category------
    if (!finalData.length)
        {
            //console.log('No Data Found !');
            document.getElementById('not-found').style.display = 'block';
            document.getElementById('loading-container').style.display = 'none';
        }
        else {
            // if data founds then----
            document.getElementById('loading-container').style.display = 'none';
            document.getElementById('not-found').style.display = 'none';
            
    }
    
    const discussContainer = document.getElementById('discuss-container');
    discussContainer.innerHTML = '';

    finalData.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('discuss-card');
        div.innerHTML = `
            <div class="bg-purple-100 mt-8 p-6 rounded-lg ml-16 flex gap-20 justify-center items-center">
                <img class="rounded-lg w-20 h-20 mt-8 mb-4" src="${post.image}" alt="">
                <div>
                    <div class="flex flex-row gap-16">
                        <h3 class="font-bold mt-8">#${post.category}</h3>
                        <h3 class="font-bold mt-8">Author: ${post.author.name}</h3>
                    </div>
                    <div>
                        <h3 class="mt-6 text-xl font-bold">${post.title}</h3>
                        <p class="mt-4 mb-3">${post.description}</p>
                        <hr class="border border-black border-dashed">
                    </div>
                    <div class="icon flex justify-between gap-40 mt-4">
                        <div class="flex flex-row gap-8 justify-center items-center">
                            <img src="images/tabler-icon-message-2.svg" alt="">
                            <p class="-ml-6">${post.comment_count}</p>
                            <img class="w-6 h-6" src="images/view.png" alt="">
                            <p class="-ml-6">${post.view_count}</p>
                            <img src="images/Vector.svg" alt="">
                            <p class="-ml-6">${post.posted_time} min</p>
                        </div>
                        <button id="title-show-btn" onclick="titleShow('${post.title}','${post.view_count}')"><img class="" src="images/Group 40106.svg" alt=""></button>
                </div>`
        
        discussContainer.appendChild(div);
    });
    
}



//handle search button
const handleSearch = () => {
    const value = document.getElementById('search-box').value;
    loadAllData(`?category=${value}`);
}



// show the title beside when the message btn is clicked

const titleShow = (title, view_count) => {
    const titleContainer = document.getElementById('title-container');
    const div = document.createElement('div');
    div.classList.add('flex');
    div.classList.add('gap-24');
    div.classList.add('mt-6');
    div.classList.add('bg-white');
    div.classList.add('p-4');
    div.classList.add('text-black');
    div.classList.add('font-semibold');
    div.classList.add('rounded-lg');
    div.innerHTML = `
    <h1>${title}</h1>
    <div class="flex gap-3 justify-center items-center">
    <img class="w-4 h-4" src="images/view.png" alt="">
    <h3>${view_count}</h3></div>
    `
    let count = 0;
    document.getElementById('title-show-btn').addEventListener('click', function (e) {
        const msg = document.getElementById('msg-count');
        count = count + 1;
        msg.innerText = count;
    }
    );
    
    titleContainer.appendChild(div);
}





// load data for latest posts
const loadAllPost = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    //console.log(data);

    const latestContainer = document.getElementById('latest-post-container');

    data.forEach(latestPost => {
        const div = document.createElement('div');
        div.classList.add('latest-post');
        div.classList.add('border');
        div.classList.add('border-violet-200');
        div.classList.add('rounded-lg');
        div.classList.add('p-4');
        div.classList.add('w-96');
        //div.classList.add('flex');
        div.innerHTML = `
                    <img class="w-96 h-60 mb-4" src="${latestPost.cover_image}" alt="">
                    <div class="flex gap-4">
                        <img class="ml-2" src="images/Frame (4).svg" alt="">
                        <h3>${latestPost.author?.posted_date || 'No Posted Date'}</h3>

                    </div>
                    <h2 class="font-bold text-xl mt-6">${latestPost.title}</h2>
                    <p class="mt-6">${latestPost.description}</p>
                    <div class="flex gap-8 mt-8">
                        <img class="w-14 h-14 rounded-full" src="${latestPost.profile_image}" alt="">
                        <div>
                            <h2 class="font-semibold text-black">${latestPost.author.name}</h2>
                            <h2>${latestPost.author?.designation || 'No designation'}</h2>
                        </div>
                    </div> 
    `
        latestContainer.appendChild(div);
    });
    
}



loadAllPost();
loadAllData("");



