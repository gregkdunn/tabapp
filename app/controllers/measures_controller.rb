class MeasuresController < ApplicationController
  respond_to :html, :json

  def index
    @accents = Accent.all
    @chords = Chord.all
    @fingers = Finger.all
    @instruments = Instrument.all
    @states = State.all
    @time_signatures = TimeSignature.all

    @measures = Measure.all

    gon.rabl

    respond_with(@measures)
  end	

  def new
    @measure = Measure.new
    respond_with(@measure)
  end	

  def create
    data = params[:measure]
    @measure = Measure.new()

    #encrypt attributes and test against saved measures

    @measure.save
    respond_with @measure
  end  

  def update
    @measure = current_user.tasks.find(params[:id])

    #encrypt attributes and test against saved measures

    @measure.update_attributes(params[:measure])
    respond_with @measure
  end

  def show
    @measure = Measure.find(params[:id])
    respond_with(@measure)
  end	

  def destroy
   @measure = Measure.find(params[:id]) 
   @measure.destroy  
   respond_with(@measure)  
  end
  
end
