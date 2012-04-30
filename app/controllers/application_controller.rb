class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @accents = Accent.all
    @chords = Chord.all
    @fingers = Finger.all
    @instruments = Instrument.all
    @states = State.all
    @time_signatures = TimeSignature.all

    gon.accents = @accents
    

  end

end
