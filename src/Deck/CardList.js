function CardList({ cards }) {
    let cardListDisplay = "";
    if (cards && cards.length > 0){
        cardListDisplay = cards.map((card) => {
            return (
                <div class="card" key={card.id}>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <p class="card-text">{card.front}</p>
                            </div>
                            <div class="col-6">
                                <p class="card-text">{card.back}</p>
                            </div>
                        </div>
                        <button className="editButton">&#128393;Edit</button>
                        <button className="deleteButton">&#128465;Delete</button>
                    </div>
                </div>
            );
        });
    }
    return cardListDisplay;
}

export default CardList;