$(document).ready(function()
{
    var searchForm = $('#searchForm'),
        search_term = $('#search_term'),
        show_list = $('#showList'),
        show_container = $('#show'),
        home_link = $('#homeLink');


    let allshows = "http://api.tvmaze.com/shows";

    $.ajax({ method:"GET",
        url: allshows,
        success: function(results){
                
            for(i = 0; i < JSON.stringify(results.length); i++)
            {
                const li=`<li class="showLink" id="${results[i].id}"> <a id="${results[i].id}" href="http://api.tvmaze.com/shows/${results[i].id}"> ${results[i].name}</a></li>`;
                    
                    //const li = '<li>test</li>';
                show_list.append(li);
            }
            show_container.hide();
            home_link.hide();
            show_list.show();
        },
        error: function(e){
            alert(JSON.stringify(e));
        }});
    

    $(document).on('click',".showLink", function(event)
    {
        event.preventDefault();
        let currentId = $(this).attr('id');

        let endpoint = `http://api.tvmaze.com/shows/${currentId}`;
        
        show_list.hide();
        show_container.empty();
        try{
            $.ajax({url: endpoint,
                    success: function(result){
                        if(result.status === "404") alert("Show does not exist");
                        else{
                            let h1 = "";
                            let img = "";
                            let dl = "";
                            if(result.name && result.name !== "")
                                h1 = `<h1>${result.name}</h1>`;
                            else
                                h1 = `<h1>N/A</h1>`;
                            
                            if(result.image && result.image.medium !== "")
                                img = `<img src=${result.image.medium} alt=${result.name}/>`;
                            else
                                img = `<img src="public/no_image.jpeg" alt="no_image" />`;
                            
                            if(result.language && result.language !== "")
                                dl = `<dl> <dt>Language</dt> <dd>${result.language}</dd>`;
                            else
                                dl = `<dl> <dt>Language</dt> <dd>N/A</dd>`;
                             
                            dl = dl + "<dt>Genres</dt> <dd> <ul>"
                            if(result.genres && result.genres.length > 0)
                            {
                                for(i=0; i < result.genres.length; i++)
                                {
                                    dl = dl + `<li>${result.genres[i]}</li>`;
                                }
                            }
                            else
                                dl = dl + '<li>N/A</li>';
                            
                            dl = dl + "</ul></dd>";
                            
                            if(result.rating && JSON.stringify(result.rating.average) !== "null")
                                dl = dl + `<dt>Rating</dt> <dd>${result.rating.average}</dd>`;
                            else
                                dl = dl + '<dt>Rating</dt> <dd>N/A</dd>';

                            if(result.network && result.network.name !== "")
                                dl = dl + `<dt>Network</dt> <dd>${result.network.name}</dd>`;
                            else
                                dl = dl + `<dt>Network</dt> <dd>N/A</dd>`;

                            if(result.summary && result.summary !== "")
                                dl = dl + `<dt>Summary</dt> <dd>${result.summary}</dd> </dl>`;
                            else
                                dl = dl + `<dt>Summary</dt> <dd>N/A</dd> </dl>`;

                            show_container.append(h1);
                            show_container.append(img);
                            show_container.append(dl);
                            show_container.show();
                            home_link.show();
                            
                        }
                    }});
                } catch(e){
                    alert(e);
                }
    });
    searchForm.submit(async function(event)
    {
        event.preventDefault();
        if(search_term.val() && search_term.val().trim() !== "")
        {
            let endpoint = `http://api.tvmaze.com/search/shows?q=${search_term.val()}`;
            try{
                show_list.empty();
                $.ajax({ url: endpoint,
                    success: function(results){
                        if(results.length === 0) alert(`We're sorry, but no results were found for ${search_term.val()}`);
                        for(i = 0; i < results.length; i++)
                        {
                            const li=`<li class="showLink" id="${JSON.stringify(results[i].show.id)}"> <a id="${JSON.stringify(results[i].show.id)}" href=http://api.tvmaze.com/shows/${JSON.stringify(results[i].show.id)}> ${results[i].show.name}</a></li>`;
                            show_list.append(li);
                        }
                        show_list.show();
                        show_container.hide();
                        home_link.show();
                        searchForm.trigger('reset');
                        search_term.focus();
                },
                error: function(e){
                    alert("failure");
                }
            });
            } catch(e) {
                alert(e);
            }
        }
        else
        {
            alert("Value for Search Term is required.");
        }
    });
});

