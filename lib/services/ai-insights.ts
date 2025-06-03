import { VideoInsightRequest, GeneratedIdea, VideoInsight } from '@/types/youtube';

export class AIInsightService {
  /**
   * Generate script ideas based on a YouTube video
   */
  async generateVideoInsights(request: VideoInsightRequest): Promise<VideoInsight> {
    try {
      // This would integrate with your existing AI service
      // For now, we'll create a mock implementation with realistic data
      
      const ideas = await this.generateIdeasFromVideo(request);
      const trends = await this.analyzeTrends(request);

      return {
        videoId: request.videoId,
        originalVideo: {
          title: request.title,
          description: request.description,
          category: request.category,
        },
        ideas,
        trends,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating video insights:', error);
      throw error;
    }
  }

  /**
   * Generate script ideas from video content
   */
  private async generateIdeasFromVideo(request: VideoInsightRequest): Promise<GeneratedIdea[]> {
    // Extract keywords and themes from title and description
    const keywords = this.extractKeywords(request.title + ' ' + request.description);
    const themes = this.identifyThemes(keywords, request.category);

    // Generate different types of adaptations
    const ideas: GeneratedIdea[] = [];

    // Direct adaptation
    ideas.push({
      id: `${request.videoId}-direct`,
      title: `${request.title} - Adaptación Cinematográfica`,
      concept: this.generateDirectConcept(request.title, request.description),
      genre: this.determineGenre(request.category, keywords),
      theme: themes[0] || 'Drama',
      characters: this.generateCharacters(keywords),
      plotPoints: this.generatePlotPoints(request.title, request.description, 'direct'),
      adaptationType: 'direct',
      confidence: 0.85,
    });

    // Inspired variation
    ideas.push({
      id: `${request.videoId}-inspired`,
      title: this.generateInspiredTitle(keywords),
      concept: this.generateInspiredConcept(themes, keywords),
      genre: this.determineSecondaryGenre(request.category, keywords),
      theme: themes[1] || themes[0] || 'Thriller',
      characters: this.generateInspiredCharacters(keywords),
      plotPoints: this.generatePlotPoints(request.title, request.description, 'inspired'),
      adaptationType: 'inspired',
      confidence: 0.75,
    });

    // Creative variation
    ideas.push({
      id: `${request.videoId}-variation`,
      title: this.generateVariationTitle(keywords),
      concept: this.generateVariationConcept(themes, keywords),
      genre: this.determineVariationGenre(request.category),
      theme: themes[2] || 'Ciencia Ficción',
      characters: this.generateVariationCharacters(keywords),
      plotPoints: this.generatePlotPoints(request.title, request.description, 'variation'),
      adaptationType: 'variation',
      confidence: 0.65,
    });

    return ideas;
  }

  /**
   * Analyze trends and patterns
   */
  private async analyzeTrends(request: VideoInsightRequest): Promise<VideoInsight['trends']> {
    const keywords = this.extractKeywords(request.title + ' ' + request.description);
    
    return [
      {
        genre: 'Drama Contemporáneo',
        popularity: 85,
        keywords: keywords.slice(0, 5),
      },
      {
        genre: 'Thriller Psicológico',
        popularity: 72,
        keywords: keywords.slice(2, 7),
      },
      {
        genre: 'Comedia Romántica',
        popularity: 68,
        keywords: keywords.slice(1, 6),
      },
    ];
  }

  // Helper methods for content generation
  private extractKeywords(text: string): string[] {
    const commonWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'del', 'al'];
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word));
    
    return [...new Set(words)].slice(0, 10);
  }

  private identifyThemes(keywords: string[], category: string): string[] {
    const themes = ['Amor', 'Traición', 'Venganza', 'Familia', 'Amistad', 'Supervivencia', 'Identidad', 'Poder', 'Justicia', 'Redención'];
    return themes.slice(0, 3);
  }

  private determineGenre(category: string, keywords: string[]): string {
    const genreMap: Record<string, string> = {
      'entertainment': 'Drama',
      'documentary': 'Drama Documental',
      'series': 'Serie Dramática',
      'shorts': 'Cortometraje',
    };
    return genreMap[category] || 'Drama';
  }

  private determineSecondaryGenre(category: string, keywords: string[]): string {
    const genres = ['Thriller', 'Comedia', 'Romance', 'Acción', 'Misterio'];
    return genres[Math.floor(Math.random() * genres.length)];
  }

  private determineVariationGenre(category: string): string {
    const genres = ['Ciencia Ficción', 'Fantasía', 'Horror', 'Western', 'Musical'];
    return genres[Math.floor(Math.random() * genres.length)];
  }

  private generateDirectConcept(title: string, description: string): string {
    return `Una adaptación cinematográfica directa de "${title}". ${description.substring(0, 150)}...`;
  }

  private generateInspiredConcept(themes: string[], keywords: string[]): string {
    const theme = themes[0] || 'drama humano';
    return `Una historia original inspirada en temas de ${theme}, explorando las complejidades de las relaciones humanas modernas.`;
  }

  private generateVariationConcept(themes: string[], keywords: string[]): string {
    return `Una reinterpretación creativa que transpone los elementos centrales a un contexto completamente diferente, manteniendo la esencia emocional.`;
  }

  private generateCharacters(keywords: string[]): string[] {
    const characterTypes = [
      'Protagonista carismático',
      'Mentor sabio',
      'Antagonista complejo',
      'Interés romántico',
      'Mejor amigo leal',
      'Figura parental',
    ];
    return characterTypes.slice(0, 4);
  }

  private generateInspiredCharacters(keywords: string[]): string[] {
    const characterTypes = [
      'Antihéroe ambiguo',
      'Científico brillante',
      'Artista atormentado',
      'Detective veterano',
      'Joven idealista',
    ];
    return characterTypes.slice(0, 3);
  }

  private generateVariationCharacters(keywords: string[]): string[] {
    const characterTypes = [
      'Explorador intergaláctico',
      'Mago aprendiz',
      'Robot con conciencia',
      'Viajero del tiempo',
      'Criatura mítica',
    ];
    return characterTypes.slice(0, 3);
  }

  private generatePlotPoints(title: string, description: string, type: 'direct' | 'inspired' | 'variation'): string[] {
    const basePlotPoints = [
      'Incidente desencadenante',
      'Primer obstáculo mayor',
      'Revelación importante',
      'Crisis emocional',
      'Clímax dramático',
      'Resolución satisfactoria',
    ];

    switch (type) {
      case 'direct':
        return basePlotPoints.slice(0, 5);
      case 'inspired':
        return [
          'Establecimiento del mundo',
          'Presentación del conflicto',
          'Desarrollo de tensión',
          'Punto de no retorno',
          'Desenlace inesperado',
        ];
      case 'variation':
        return [
          'Introducción al concepto único',
          'Escalada de consecuencias',
          'Dilema moral complejo',
          'Sacrificio necesario',
          'Nueva realidad',
        ];
      default:
        return basePlotPoints.slice(0, 4);
    }
  }

  private generateInspiredTitle(keywords: string[]): string {
    const titles = [
      'Ecos del Pasado',
      'Nuevos Horizontes',
      'Entre Líneas',
      'Momentos Perdidos',
      'Caminos Cruzados',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateVariationTitle(keywords: string[]): string {
    const titles = [
      'Dimensiones Paralelas',
      'El Último Refugio',
      'Código Ancestral',
      'Metamorfosis Digital',
      'Resonancia Cuántica',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }
}
