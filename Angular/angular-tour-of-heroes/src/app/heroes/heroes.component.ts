import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'



@Component({
  selector: 'app-heroes', //the component's css element selector
  templateUrl: './heroes.component.html', //the location of the component's template file
  styleUrls: ['./heroes.component.css'] //the location of the component's private css styles
})
export class HeroesComponent implements OnInit { //exporting this component so that it can be used elsewhere

  heroes: Hero[];


  constructor(private heroService: HeroService) { } //The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  
}


